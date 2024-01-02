<script lang="ts">
	import { addSepDot, isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import { writable } from 'svelte/store';
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';

	export let data;
	const id: number = Number(data.params.buildingID);
	let building = liveQuery(() => db.buildings.get(id));

	let buildingDictionary = liveQuery(() => db.buildingDictionary.toArray());
	let vehicles = liveQuery(() => db.vehicles.where('building_id').equals(id).sortBy('caption'));
	let vehicleDictionary = liveQuery(() => db.vehicleDictionary.toArray());

	let building_cost = writable(0);
	let building_remaining_cost = writable(0);
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
		{#if $buildingDictionary[$building.building_type].extensions.length != 0}
			{#if sortExtensionsDictionary($building, $buildingDictionary)}
				<div id="extensions" class="w-fit border-2 border-neutral p-2">
					<table class="table table-zebra">
						<thead
							><th class="text-xl">Extensions</th>
							<th>cost</th>
						</thead>
						<tbody>
							{#each sortExtensionsDictionary($building, $buildingDictionary) as extension}
								<tr>
									{#if extension}
										{#if isExtensionPurchased($building, extension)}
											<td> <span class="text-success"> {extension.caption} </span></td>
											<td
												><span
													>{addSepDot(extension.credits || 0)} ¢
													{building_cost.update((n) => n + (extension.credits || 0)) || ''}</span
												></td
											>
										{:else}
											<td><span class="text-error"> {extension.caption} </span></td>
											<td
												><span
													>{addSepDot(extension.credits || 0)} ¢
													{building_remaining_cost.update((n) => n + (extension.credits || 0)) ||
														''}</span
												></td
											>
										{/if}
									{/if}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		{/if}
	{/if}
	{#if $vehicles && $vehicleDictionary && $vehicles.length != 0}
		<div id="vehicles" class="w-fit border-2 border-neutral p-2">
			<table class="table table-zebra">
				<thead class="">
					<th class="text-start text-2xl">Fahrzeuge</th>
					<th class="flex flex-col items-center">
						<span>Personnel</span>
						<span>max | assigned</span>
					</th>
				</thead>
				<tbody>
					{#if $vehicles && $vehicleDictionary}
						{#each $vehicles as vehicle}
							<tr class="">
								<td class="flex items-center gap-1">
									<h5>{vehicle.caption}</h5>
									<span class="text-xs opacity-50"
										>({$vehicleDictionary[vehicle.vehicle_type].caption})</span
									>
								</td>
								<td class="text-center"
									>{vehicle.max_personnel_override ?? 0} | {vehicle.assigned_personnel_count ?? 0}
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	{/if}
</div>
