<script lang="ts">
	import { isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';

	let buildingPlanCount = liveQuery(() => db.buildingPlan.count());
	let search = '';

	$: buildings = liveQuery(() =>
		db.buildingPlan
			.orderBy('caption')
			.filter((building) =>
				building.caption.toLocaleLowerCase().includes(search.toLocaleLowerCase())
			)
			.toArray()
	);
	let buildingDictionary = liveQuery(() => db.buildingDictionary.toArray());
	let vehicles = liveQuery(() => db.vehicles.orderBy('caption').toArray());
</script>

<div class="">
	<div id="options" class="flex w-full justify-between gap-2">
		<a class="btn btn-ghost" href="/">&larr;</a>
		{#if $buildings}
			<span class="flex w-full items-center justify-end align-middle"
				>{$buildings.length} von {$buildingPlanCount}</span
			>
		{/if}
		<input
			type="search"
			name="search"
			id="search"
			placeholder="search"
			class="input input-bordered w-full max-w-xs"
			bind:value={search}
		/>
		<a class="btn btn-primary text-2xl" href="/plan/new">+</a>
	</div>
	<table class="table table-zebra">
		<thead class="">
			<th class="text-start text-2xl">Plan</th>
			<th>
				<div class="flex flex-col items-center">
					<span>Personnel</span>
					<span class=" text-xs opacity-50">target</span>
				</div>
			</th>
			<th> Vehicles </th>
			<th>
				<div class="flex flex-col">
					<span>extensions</span>
					<span class=" text-xs opacity-50"
						><span class="text-success">bought</span> |
						<span class="text-error">available</span></span
					>
				</div>
			</th>
			<th></th>
		</thead>
		<tbody>
			{#if $buildings && $buildingDictionary}
				{#each $buildings as building}
					<tr class="">
						<td class="  p-1">
							<h5 class="">
								<a data-sveltekit-reload href="plan/{building.id}">
									{building.caption}
								</a>
							</h5>
							<span class=" text-xs opacity-70"
								>({#if building.small_building}
									kleine
								{/if}{$buildingDictionary[building.building_type].caption})</span
							>
						</td>
						<td>{building.personal_count_target}</td>
						<td
							>{#if $vehicles}
								{$vehicles.filter((vehicle) => vehicle.building_id == building.id).length}
							{/if}</td
						>
						<td class="  p-1">
							{#each sortExtensionsDictionary(building, $buildingDictionary) as extension}
								{#if extension}
									{#if isExtensionPurchased(building, extension)}
										<span class="text-success"> {extension.caption} <br /> </span>
									{:else}
										<span class="text-error"> {extension.caption} <br /> </span>
									{/if}
								{/if}
							{/each}
						</td>
						<td>
							<a class="btn btn-ghost btn-xs" data-sveltekit-reload href="plan/{building.id}"
								>details</a
							>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
