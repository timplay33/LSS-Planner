<script>
	export let building;
	export let buildingDictionary;
</script>

<tr class="">
	<td class="flex items-center gap-1">
		<h5 class="">{building.caption}</h5>
		<span class=" text-xs opacity-50">({buildingDictionary[building.building_type].caption})</span>
	</td>
</tr>
