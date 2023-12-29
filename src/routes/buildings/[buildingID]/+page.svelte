<script lang="ts">
	import { addSepDot, isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import type { Building } from '@lss-manager/missionchief-type-definitions/src/api/Building';
	import { buildingDictionary, buildings } from '../../stores';
	import { writable } from 'svelte/store';
	export let data;
	const id: number = Number(data.params.buildingID);
	let building: Array<Building>;
	building = $buildings.filter((b) => b.id == id);
	let b: Building;
	if (building[0] != undefined && building[0] != null) {
		b = building[0];
	}

	let building_cost = writable($buildingDictionary[b?.building_type]?.credits);
	let building_remaining_cost = writable(0);
</script>

<div>
	<h2 class="text-2xl">{b?.caption || ''}</h2>
	<ul>
		<li>Gebäude: {$buildingDictionary[b?.building_type]?.caption || 0}</li>
		<li>Kosten Gebäude: {addSepDot($buildingDictionary[b?.building_type]?.credits || 0)} ¢</li>
		<li>Gesamt ausgegeben: {addSepDot($building_cost || 0)} ¢</li>
		<li>Kosten verbleibend: {addSepDot($building_remaining_cost || 0)} ¢</li>
	</ul>
	{#if sortExtensionsDictionary(b, $buildingDictionary)}
		<div class="w-fit border-2 border-neutral p-2">
			<h3 class="text-xl">Extensions</h3>

			{#each sortExtensionsDictionary(b, $buildingDictionary) as extension}
				{#if isExtensionPurchased(b, extension)}
					<span class="text-success"> {extension?.caption} </span>
					<span
						>{addSepDot(extension?.credits || 0)} ¢
						{building_cost.update((n) => n + (extension?.credits || 0)) || ''}</span
					><br />
				{:else}
					<span class="text-error"> {extension?.caption || ''} </span><span
						>{addSepDot(extension?.credits || 0)} ¢
						{building_remaining_cost.update((n) => n + (extension?.credits || 0)) || ''}</span
					><br />
				{/if}
			{/each}
		</div>
	{/if}
</div>
