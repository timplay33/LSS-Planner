<script lang="ts">
	import { db } from '$lib/db';
	import type { Vehicle } from '@lss-manager/missionchief-type-definitions/src/api/Vehicle';

	let vehicle: Vehicle = {
		id: 0,
		caption: '',
		building_id: 0,
		vehicle_type: 0,
		fms_real: 2,
		fms_show: 2,
		vehicle_type_caption: '',
		working_hour_start: NaN,
		working_hour_end: NaN,
		alarm_delay: NaN,
		max_personnel_override: null,
		assigned_personnel_count: NaN,
		ignore_aao: false,
		target_type: null,
		target_id: null
	};

	async function addVehicle() {
		try {
			// Add the new friend!
			const id = await db.vehicles.add(vehicle);
			console.log(id);
		} catch (error) {
			console.error(error);
		}
	}

	import { liveQuery } from 'dexie';

	//let vehicles = liveQuery(() => db.vehicles.toArray());

	$: vehicles = liveQuery(async () => {
		//
		// Query Dexie's API
		//
		const vehicles = await db.vehicles.where('building_id').equals(0).toArray();

		// Return result
		return vehicles;
	});
</script>

<div>Test</div>
<div>
	<fieldset>
		<legend>Add new friend</legend>
		<label>
			Name:
			<input type="text" bind:value={vehicle.caption} />
		</label>
		<br />
		<label>
			ID:
			<input type="number" bind:value={vehicle.id} />
		</label>
		<br />
		<label>
			building_id:
			<input type="number" bind:value={vehicle.building_id} />
		</label>
		<br />
		<button on:click={addVehicle}>Add Vehicle</button>
	</fieldset>
</div>
<div>
	<ul>
		{#if $vehicles}
			{#each $vehicles as vehicle (vehicle.id)}
				<li>{vehicle.id}: {vehicle.caption}, {vehicle.fms_real}, {vehicle.building_id}</li>
			{/each}
		{/if}
	</ul>
</div>
