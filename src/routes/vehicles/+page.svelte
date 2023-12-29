<script>
	import { vehicles } from '../stores';
	import { vehicleDictionary } from '../stores';
</script>

<div class="">
	<table>
		<thead class="">
			<th class="text-start text-2xl">Fahrzeuge</th>
			<th class="flex flex-col">
				<span>Personnel</span>
				<span class="w-24 text-xs opacity-50">max | assigned</span>
			</th>
		</thead>
		<tbody>
			{#each $vehicles as vehicle}
				<tr class="">
					<td class="flex items-center gap-1">
						<h5 class="">{vehicle?.caption}</h5>
						<span class=" text-xs opacity-50"
							>({$vehicleDictionary[vehicle?.vehicle_type]?.caption})</span
						>
					</td>
					<td class="text-center"
						>{vehicle.max_personnel_override ?? 0} | {vehicle.assigned_personnel_count ?? 0}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
