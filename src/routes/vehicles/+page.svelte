<script>
	import { liveQuery } from 'dexie';
	let vehicles = liveQuery(() => db.vehicles.orderBy('caption').toArray());
	let vehicleDictionary = liveQuery(() => db.vehicleDictionary.toArray());
	import { db } from '$lib/db';
</script>

<div class="">
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
								>({$vehicleDictionary[vehicle.vehicle_type].caption})</span
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
