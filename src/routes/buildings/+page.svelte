<script lang="ts">
	import { isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';

	let search = '';

	$: buildings = liveQuery(() =>
		db.buildings
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
	<div id="options" class="flex w-full justify-between">
		<a class="btn btn-ghost" href="/">&larr;</a>
		<input
			type="search"
			name="search"
			id="search"
			placeholder="search"
			class="input input-bordered w-full max-w-xs"
			bind:value={search}
		/>
	</div>
	<table class="table table-zebra">
		<thead class="">
			<th class="text-start text-2xl">Wachen</th>
			<th>
				<div class="flex flex-col items-center">
					<span>Personnel</span>
					<span class=" text-xs opacity-50">count | target</span>
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
								<a data-sveltekit-reload href="buildings/{building.id}">
									{building.caption}
									{#if !building.enabled}
										<span class="opacity-30">status:</span>
										<span class="bg-b-fms-6 px-1 text-sm text-t-fms-6">6</span>{/if}
								</a>
							</h5>
							<span class=" text-xs opacity-70"
								>({#if building.small_building}
									kleine
								{/if}{$buildingDictionary[building.building_type].caption})</span
							>
						</td>
						{#if building.personal_count > building.personal_count_target}
							<td class="  text-center text-warning"
								>{building.personal_count ?? 0} | {building.personal_count_target ?? 0}
							</td>
						{:else}
							<td class="  text-center"
								>{building.personal_count ?? 0} | {building.personal_count_target ?? 0}
							</td>
						{/if}
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
							<a class="btn btn-ghost btn-xs" data-sveltekit-reload href="buildings/{building.id}"
								>details</a
							>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
