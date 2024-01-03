<script lang="ts">
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import type { BuildingPlan } from '../../types';
	import { goto } from '$app/navigation';

	let buildings = liveQuery(() => db.buildings.orderBy('caption').toArray());
	let buildingPlan = liveQuery(() => db.buildingPlan.toArray());
	let buildingDictionary = liveQuery(() => db.buildingDictionary.toArray());
	let vehicleDictionary = liveQuery(() => db.vehicleDictionary.toArray());

	let newPlan: BuildingPlan = {
		building_id: null,
		level: 1,
		building_type: 0,
		caption: '',
		extensions: [],
		leitstelle_building_id: null,
		leitstelle_building_id_plan: null,
		small_building: false,
		personal_count_target: 0
	};

	async function submit() {
		switch (newPlan.building_type) {
			case 18:
				newPlan.building_type = 0;
				newPlan.small_building = true;
			case 19:
				newPlan.building_type = 6;
				newPlan.small_building = true;
			case 20:
				newPlan.building_type = 2;
				newPlan.small_building = true;
		}

		const id = await db.buildingPlan.add(newPlan);
		console.log(id);
		goto('/plan/' + id);
	}

	function linkBuilding() {
		if (newPlan.building_id) {
			let building = $buildings.filter((x) => x.id == newPlan.building_id)[0];
			newPlan.caption = building.caption;
			newPlan.level = building.level;
			newPlan.building_type = building.building_type;
			newPlan.extensions = building.extensions;
			newPlan.leitstelle_building_id = building.leitstelle_building_id;
			newPlan.small_building = building.small_building;
			newPlan.personal_count_target = building.personal_count_target;
		}
	}
</script>

<div>
	{#if $buildingDictionary && $buildings}
		<div class="flex items-center gap-1">
			<a class="btn btn-ghost" href="/plan">&larr;</a>
			<h2 class="text-2xl">create new plan</h2>
		</div>
		<div class="flex max-w-72 flex-col gap-2">
			<span>select existing building</span>
			<select
				class="select select-bordered w-full max-w-xs"
				bind:value={newPlan.building_id}
				on:change={linkBuilding}
			>
				<option value={null}>create a new one</option>
				{#each $buildings as option}
					<option value={option.id}>
						{option.caption}
					</option>
				{/each}
			</select>
			<span>caption</span>
			<input
				class="input input-bordered"
				placeholder="caption"
				bind:value={newPlan.caption}
				type="text"
			/>
			<span>level</span>
			<select class="select select-bordered w-full max-w-xs" bind:value={newPlan.level}>
				{#each { length: $buildingDictionary[newPlan.building_type].maxLevel } as _, index}
					<option value={index}>
						{index}
					</option>
				{/each}
			</select>
			<span>building type</span>
			<select class="select select-bordered w-full max-w-xs" bind:value={newPlan.building_type}>
				{#each $buildingDictionary as option, index}
					<option value={index}>
						{option.caption}
					</option>
				{/each}
			</select>
			<span>Leitstelle</span>
			<select
				class="select select-bordered w-full max-w-xs"
				bind:value={newPlan.leitstelle_building_id}
			>
				<option value={null}>keine Leitstelle</option>
				{#each $buildings as option}
					{#if option.building_type == 7}
						<!-- 7 for leitstelle-->
						<option value={option.id}>
							{option.caption}
						</option>
					{/if}
				{/each}
			</select>
			<span>personal count target</span>
			<input
				class="input input-bordered"
				placeholder="personal count taget"
				bind:value={newPlan.personal_count_target}
				type="number"
			/>
			<button class="btn btn-primary" on:click={submit}>Save</button>
		</div>
	{/if}
</div>
