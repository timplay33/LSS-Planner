<script>
	import { buildingDictionary, buildings } from '../stores';

	function SortExtensions(building) {
		let extentions = building.extensions.sort((a, b) => a.caption.localeCompare(b.caption));
		return extentions;
	}
	function sortExtensionsDictionary(building) {
		let extentionsDictionary = $buildingDictionary[building.building_type].extensions.sort((a, b) =>
			a.caption.localeCompare(b.caption)
		);
		return extentionsDictionary;
	}
</script>

<div class="">
	<table>
		<thead class="">
			<th class="text-start text-2xl">Wachen</th>
			<th class="flex flex-col">
				<span>Personnel</span>
				<span class="w-24 text-xs opacity-50">count | target</span>
			</th>
			<th class="">extensions</th>
			<th class="">posible extensions</th>
		</thead>
		<tbody>
			{#each $buildings as building}
				<tr class="">
					<td class="border-neutral border-2 p-1">
						<h5 class="">{building.caption}</h5>
						<span class=" text-xs opacity-70"
							>({#if building.small_building}
								kleine
							{/if}{$buildingDictionary[building.building_type].caption})</span
						>{#if !building.enabled}<span class="bg-black px-1 text-sm text-white">6</span>{/if}
					</td>
					{#if building.personal_count > building.personal_count_target}
						<td class="text-warning border-neutral border-2 text-center"
							>{building.personal_count ?? 0} | {building.personal_count_target ?? 0}
						</td>
					{:else}
						<td class="border-neutral border-2 text-center"
							>{building.personal_count ?? 0} | {building.personal_count_target ?? 0}
						</td>
					{/if}
					<td class="border-neutral border-2 p-1"
						>{#each SortExtensions(building) as extension}
							<span>{extension.caption} </span>
							{#if !extension.enabled}
								<span class="bg-b-fms-6 text-t-fms-6 px-1 text-sm">6</span>
							{/if}
							<br />
						{/each}
					</td>
					<td class="border-neutral border-2 p-1"
						>{#each sortExtensionsDictionary(building) as extension}
							<span>{extension.caption} <br /> </span>
						{/each}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
