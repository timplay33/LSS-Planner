<script lang="ts">
	import { addSepDot, isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import { writable } from 'svelte/store';
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { goto } from '$app/navigation';

	export let data;
	const id: number = Number(data.params.planID);
	let buildingPlan = liveQuery(() => db.buildingPlan.get(id));

	let buildingDictionary = liveQuery(() => db.buildingDictionary.toArray());
	let vehicles = liveQuery(() => db.vehicles.where('building_id').equals(id).sortBy('caption'));
	let vehicleDictionary = liveQuery(() => db.vehicleDictionary.toArray());

	let extension_cost = writable(0);
	let vehicle_cost = writable(0);

	async function delPlan() {
		if (confirm('Are you sure you want to delete THIS PLAN?')) {
			await db.buildingPlan.delete(id);
			alert('plan deleted');
			goto('/plan');
		}
	}
</script>

<div>
	{#if $buildingPlan && $buildingDictionary}
		<div>
			<div class="flex items-center gap-1">
				<a class="btn btn-ghost" href="/plan">&larr;</a>
				<h2 class="text-2xl">{$buildingPlan.caption}</h2>
				<span class="text-lg opacity-50"
					>({#if $buildingPlan.small_building}
						kleine
					{/if}{$buildingDictionary[$buildingPlan.building_type].caption})</span
				>
			</div>
			<table class="table table-zebra w-fit">
				<thead><th><h3 class="text-xl">Kosten</h3></th> <th></th> <th></th></thead>
				<tbody>
					<tr
						><td>Gebäude Kosten</td><td> </td><td>
							{addSepDot($buildingDictionary[$buildingPlan.building_type].credits)} ¢</td
						>
					</tr>
					<tr><td>Erweiterungs Kosten</td> <td> + </td><td>{addSepDot($extension_cost)} ¢</td></tr>
					<tr><td>Fahrzeug Kosten</td><td> + </td><td> {addSepDot($vehicle_cost)} ¢</td></tr>
					<tr
						><td>Kosten</td><td> = </td><td class="underline"
							>{addSepDot(
								$buildingDictionary[$buildingPlan.building_type].credits +
									$extension_cost +
									$vehicle_cost
							)} ¢</td
						>
					</tr>
				</tbody>
			</table>
			{#if $buildingDictionary[$buildingPlan.building_type].extensions.length != 0}
				{#if sortExtensionsDictionary($buildingPlan, $buildingDictionary)}
					<div id="extensions" class="w-fit border-2 border-neutral p-2">
						<table class="table table-zebra">
							<thead
								><th class="text-xl">Extensions</th>
								<th class="text-center">cost</th>
							</thead>
							<tbody>
								{#each sortExtensionsDictionary($buildingPlan, $buildingDictionary) as extension}
									<tr>
										{#if extension}
											{#if isExtensionPurchased($buildingPlan, extension)}
												<td> <span class="text-success"> {extension.caption} </span></td>
												<td
													><span
														>{addSepDot(extension.credits || 0)} ¢
														{extension_cost.update((n) => n + (extension.credits || 0)) || ''}</span
													></td
												>
											{:else}
												<td><span class="text-error"> {extension.caption} </span></td>
												<td
													><span
														>{addSepDot(extension.credits || 0)} ¢
														{extension_cost.update((n) => n + (extension.credits || 0)) || ''}</span
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

			{#if $vehicles && $vehicleDictionary && $vehicles.length != 0}
				<div id="vehicles" class="w-fit border-2 border-neutral p-2">
					<table class="table table-zebra">
						<thead class="">
							<th class="text-start text-2xl">Fahrzeuge</th>
							<th class="flex flex-col items-center">
								<span>Personnel</span>
								<span>max | assigned</span>
							</th>
							<th class="text-center">cost</th>
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
											>{vehicle.max_personnel_override ?? 0} | {vehicle.assigned_personnel_count ??
												0}
										</td>
										<td>
											{addSepDot($vehicleDictionary[vehicle.vehicle_type].credits)} ¢ {vehicle_cost.update(
												(n) => n + ($vehicleDictionary[vehicle.vehicle_type].credits || 0)
											) || ''}
										</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
				</div>
			{/if}
			<button class="btn btn-error" on:click={delPlan}>Delete</button>
		</div>
	{:else}
		<div>
			<div class="flex items-center gap-1">
				<a class="btn btn-ghost" href="/plan">&larr;</a>
				<h2 class="text-2xl">404: error plan not found</h2>
			</div>
		</div>
	{/if}
</div>
