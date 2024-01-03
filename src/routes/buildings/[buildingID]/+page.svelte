<script lang="ts">
	import { addSepDot, getBack, isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import { writable, type Writable } from 'svelte/store';
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import type { Building } from '@lss-manager/missionchief-type-definitions/src/api/Building.js';
	import type { Vehicle } from '@lss-manager/missionchief-type-definitions/src/api/Vehicle.js';
	import type { BuildingDictionary, ExtensionDictionary, VehicleDictionary } from '../../types.js';

	export let data;
	const id: number = Number(data.params.buildingID);
	let building = liveQuery(() => db.buildings.get(id));

	let buildingDictionary = liveQuery(() => db.buildingDictionary.toArray());
	let vehicles = liveQuery(() => db.vehicles.where('building_id').equals(id).sortBy('caption'));
	let vehicleDictionary = liveQuery(() => db.vehicleDictionary.toArray());

	let extension_cost: Writable<number> = writable(0);
	let vehicle_cost: Writable<number> = writable(0);
	let extension_remaining_cost: Writable<number> = writable(0);
	let level_cost: Writable<number> = writable(0);
	let level_remaining_cost: Writable<number> = writable(0);

	function calcLevelCost(local_building: Building, local_buildingDictionary: BuildingDictionary[]) {
		let level = local_building.level;
		if (level != 0) {
			for (let i = 1; i <= level; i++) {
				$level_cost +=
					local_buildingDictionary[local_building.building_type].levelPrices.credits[i];
			}
		}
	}

	function calcRemainingLevelCost(
		local_building: Building,
		local_buildingDictionary: BuildingDictionary[]
	) {
		let level = local_building.level;
		let dictLevel = local_buildingDictionary[local_building.building_type].maxLevel - 1;
		if (level != 0 && dictLevel != 0) {
			for (let i = level; i <= dictLevel; i++) {
				$level_remaining_cost +=
					local_buildingDictionary[local_building.building_type].levelPrices.credits[i];
			}
		}
	}

	function calcExtensionCost(
		local_building: Building,
		local_buildingDictionary: BuildingDictionary[]
	) {
		for (let extension of sortExtensionsDictionary(local_building, local_buildingDictionary)) {
			if (isExtensionPurchased(local_building, extension)) {
				$extension_cost += local_buildingDictionary[local_building.building_type].extensions.filter(
					(e: ExtensionDictionary) => e?.caption == extension.caption
				)[0].credits;
			}
		}
	}

	function calcRemainingExtensionCost(
		local_building: Building,
		local_buildingDictionary: BuildingDictionary[]
	) {
		for (let extension of sortExtensionsDictionary(local_building, local_buildingDictionary)) {
			if (!isExtensionPurchased(local_building, extension)) {
				$extension_remaining_cost += local_buildingDictionary[
					local_building.building_type
				].extensions.filter((e: ExtensionDictionary) => e?.caption == extension.caption)[0].credits;
			}
		}
	}

	function calcVehicleCost(
		local_vehicles: Vehicle[],
		local_vehicleDictionary: VehicleDictionary[]
	) {
		if (local_vehicles.length == 0) {
			return 0;
		} else if (local_vehicles.length == 1) {
			let vehicle = local_vehicles[0];
			$vehicle_cost += local_vehicleDictionary[vehicle.vehicle_type].credits;
		} else {
			for (let vehicle of local_vehicles) {
				$vehicle_cost += local_vehicleDictionary[vehicle.vehicle_type].credits;
			}
		}
	}

	$: if ($building && $buildingDictionary && $vehicles && $vehicleDictionary) {
		calcLevelCost($building, $buildingDictionary);
		calcRemainingLevelCost($building, $buildingDictionary);
		calcExtensionCost($building, $buildingDictionary);
		calcRemainingExtensionCost($building, $buildingDictionary);
		calcVehicleCost($vehicles, $vehicleDictionary);
	}
</script>

<div>
	{#if $building && $buildingDictionary}
		<div class="flex items-center gap-1">
			<button class="btn btn-ghost" on:click={getBack}>&larr;</button>
			<h2 class="text-2xl">{$building.caption}</h2>
			<span class="text-lg opacity-50">
				({#if $building.small_building}kleine
				{/if}{$buildingDictionary[$building.building_type].caption})
			</span>
		</div>
		<div class="flex flex-wrap gap-5">
			<table class="table table-zebra h-fit w-fit">
				<thead><th><h3 class="text-xl">Kosten</h3></th> <th></th> <th></th></thead>
				<tbody>
					<tr>
						<td>Gebäude Kosten</td><td> </td><td>
							{addSepDot($buildingDictionary[$building.building_type].credits)} ¢
						</td>
					</tr>
					<tr><td>Level Kosten</td> <td> + </td><td>{addSepDot($level_cost)} ¢</td></tr>
					<tr><td>Erweiterungs Kosten</td> <td> + </td><td>{addSepDot($extension_cost)} ¢</td></tr>
					<tr><td>Fahrzeug Kosten</td><td> + </td><td> {addSepDot($vehicle_cost)} ¢</td></tr>
					<tr>
						<td> Gesamt ausgegeben</td><td> = </td><td class="underline"
							>{addSepDot(
								$buildingDictionary[$building.building_type].credits +
									$level_cost +
									$extension_cost +
									$vehicle_cost
							)} ¢
						</td>
					</tr>
				</tbody>
			</table>
			<table class="table table-zebra h-fit w-fit">
				<thead>
					<thead><th><h3 class="text-xl">Kosten verbleibend</h3></th> <th></th> <th></th></thead>
				</thead>
				<tbody>
					<tr>
						<td>Erweiterungs Kosten verbleibend</td><td></td>
						<td>{addSepDot($extension_remaining_cost)} ¢</td>
					</tr>
					<tr>
						<td>Level Kosten verbleibend</td><td>+</td><td
							>{addSepDot($level_remaining_cost)} ¢
						</td>
					</tr>
					<tr>
						<td>Gesamt Kosten verbleibend</td><td>=</td><td class="underline"
							>{addSepDot($level_remaining_cost + $extension_remaining_cost)} ¢
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		{#if $buildingDictionary[$building.building_type].extensions.length != 0}
			{#if sortExtensionsDictionary($building, $buildingDictionary)}
				<div id="extensions" class="w-fit border-2 border-neutral p-2">
					<table class="table table-zebra">
						<thead>
							<th class="text-xl">Extensions</th>
							<th class="text-center">cost</th>
						</thead>
						<tbody>
							{#each sortExtensionsDictionary($building, $buildingDictionary) as extension}
								<tr>
									{#if extension}
										{#if isExtensionPurchased($building, extension)}
											<td><span class="text-success">{extension.caption}</span></td>
											<td><span>{addSepDot(extension.credits || 0)} ¢</span></td>
										{:else}
											<td><span class="text-error"> {extension.caption} </span></td>
											<td><span>{addSepDot(extension.credits || 0)} ¢</span></td>
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
					<th class="text-center">cost</th>
				</thead>
				<tbody>
					{#each $vehicles as vehicle}
						<tr class="">
							<td class="flex items-center gap-1">
								<h5>{vehicle.caption}</h5>
								<span class="text-xs opacity-50">
									({$vehicleDictionary[vehicle.vehicle_type].caption})
								</span>
							</td>
							<td class="text-center">
								{vehicle.max_personnel_override ?? 0} | {vehicle.assigned_personnel_count ?? 0}
							</td>
							<td>
								{addSepDot($vehicleDictionary[vehicle.vehicle_type].credits)} ¢
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
