<script>
	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';

	let search = '';
	let vehiclesCount = liveQuery(() => db.vehicles.count());

	$: vehicles = liveQuery(() =>
		db.vehicles
			.orderBy('caption')
			.filter((vehicle) => vehicle.caption.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
			.toArray()
	);
	let vehicleDictionary = liveQuery(() => db.vehicleDictionary.toArray());
</script>

<div class="">
	<div id="options" class="flex w-full justify-between gap-2">
		<a class="btn btn-ghost" href="/">&larr;</a>
		{#if $vehicles}
			<span class="flex w-full items-center justify-end align-middle"
				>{$vehicles.length} von {$vehiclesCount}</span
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
	</div>
	<table class="table table-zebra">
		<thead class="">
			<th class="text-start text-2xl">Fahrzeuge</th>
			<th class="flex flex-col items-center">
				<span>Personnel</span>
				<span>max | assigned</span>
			</th>
			<th></th>
		</thead>
		<tbody>
			{#if $vehicles && $vehicleDictionary}
				{#each $vehicles as vehicle}
					<tr class="">
						<td class="flex items-center gap-1">
							<h5>{vehicle.caption}</h5>
							<span class="text-xs opacity-50"
								>({$vehicleDictionary[vehicle.vehicle_type]?.caption})</span
							>
						</td>
						<td class="text-center"
							>{vehicle.max_personnel_override ?? 0} | {vehicle.assigned_personnel_count ?? 0}
						</td>
						<td>
							<button class="btn btn-ghost btn-xs">details</button>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
