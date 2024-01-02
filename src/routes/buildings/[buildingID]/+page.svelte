<script lang="ts">
	import { addSepDot, isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import { writable } from 'svelte/store';
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';

	export let data;
	const id: number = Number(data.params.buildingID);
	let building = liveQuery(() => db.buildings.get(id));

	let buildingDictionary = liveQuery(() => db.buildingDictionary.toArray());

	let building_cost = writable(0);
	let building_remaining_cost = writable(0);
	console.log($building_cost);
</script>

<div>
	{#if $building && $buildingDictionary}
		<h2 class="text-2xl">{$building.caption}</h2>
		<ul>
			<li>Gebäude: {$buildingDictionary[$building.building_type].caption}</li>
			<li>
				Kosten Gebäude: {addSepDot($buildingDictionary[$building.building_type].credits)} ¢ {building_cost.update(
					(n) => n + $buildingDictionary[$building.building_type].credits
				) || ''}
			</li>
			<li>Gesamt ausgegeben: {addSepDot($building_cost)} ¢</li>
			<li>Kosten verbleibend: {addSepDot($building_remaining_cost)} ¢</li>
		</ul>
		{#if sortExtensionsDictionary($building, $buildingDictionary)}
			<div class="w-fit border-2 border-neutral p-2">
				<h3 class="text-xl">Extensions</h3>

				{#each sortExtensionsDictionary($building, $buildingDictionary) as extension}
					{#if extension}
						{#if isExtensionPurchased($building, extension)}
							<span class="text-success"> {extension.caption} </span>
							<span
								>{addSepDot(extension.credits || 0)} ¢
								{building_cost.update((n) => n + (extension.credits || 0)) || ''}</span
							><br />
						{:else}
							<span class="text-error"> {extension.caption} </span><span
								>{addSepDot(extension.credits || 0)} ¢
								{building_remaining_cost.update((n) => n + (extension.credits || 0)) || ''}</span
							><br />
						{/if}
					{/if}
				{/each}
			</div>
		{/if}
	{/if}
</div>
