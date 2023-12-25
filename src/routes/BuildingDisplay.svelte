<script>
	export let building;
	export let buildingDictionary;

	let extentions = building.extensions.sort((a, b) => a.caption.localeCompare(b.caption));
	let extentionsDictionary = buildingDictionary[building.building_type].extensions.sort((a, b) =>
		a.caption.localeCompare(b.caption)
	);
</script>

<tr class="">
	<td class="border-2 p-1">
		<h5 class="">{building.caption}</h5>
		<span class=" text-xs opacity-50"
			>({#if building.small_building}
				kleine
			{/if}{buildingDictionary[building.building_type].caption})</span
		>{#if !building.enabled}<span class="bg-black px-1 text-sm text-white">6</span>{/if}
	</td>
	{#if building.personal_count > building.personal_count_target}
		<td class="border-2 text-center text-red-700"
			>{building.personal_count ?? 0} | {building.personal_count_target ?? 0}
		</td>
	{:else}
		<td class="border-2 text-center"
			>{building.personal_count ?? 0} | {building.personal_count_target ?? 0}
		</td>
	{/if}
	<td class="border-2 p-1"
		>{#each extentions as extension}
			<span>{extension.caption} </span>
			{#if !extension.enabled}
				<span class="bg-black px-1 text-sm text-white">6</span>
			{/if}
			<br />
		{/each}
	</td>
	<td class="border-2 p-1"
		>{#each extentionsDictionary as extension}
			<span>{extension.caption} <br /> </span>
		{/each}
	</td>
</tr>
