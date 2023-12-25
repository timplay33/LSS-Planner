<script lang="ts">
	export let vehicle;
	export let vehicleDictionary;
</script>

<tr class="">
	<td class="flex items-center gap-1">
		<h5 class="">{vehicle.caption}</h5>
		<span class=" text-xs opacity-50">({vehicleDictionary[vehicle.vehicle_type].caption})</span>
	</td>
	<td class="text-center"
		>{vehicle.max_personnel_override ?? 0} | {vehicle.assigned_personnel_count ?? 0}
	</td>
</tr>
