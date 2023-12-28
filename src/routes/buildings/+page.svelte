<script lang="ts">
	import { buildingDictionary, buildings } from '../stores';

	function sortExtensions(building) {
		let extentions = building.extensions.sort((a, b) => a.caption.localeCompare(b.caption));
		return extentions;
	}
	function sortExtensionsDictionary(building) {
		let extentionsDictionary = $buildingDictionary[building.building_type].extensions.sort((a, b) =>
			a.caption.localeCompare(b.caption)
		);
		return extentionsDictionary;
	}

	function isExtensionPurchased(building, extension) {
		const purchasedExtensions = sortExtensions(building);
		let purchased = false;
		let i = 0;
		if (purchasedExtensions.length > 0) {
			while (i < purchasedExtensions.length) {
				if (purchasedExtensions[i].caption == extension.caption) {
					purchasedExtensions.shift();
					purchased = true;
					break;
				}
				i++;
			}

			return purchased;
		}
		return purchased;
	}
</script>

<div class="">
	<table>
		<thead class="">
			<th class="text-start text-2xl">Wachen</th>
			<th>
				<div class="flex w-24 flex-col">
					<span>Personnel</span>
					<span class=" text-xs opacity-50">count | target</span>
				</div>
			</th>
			<th>
				<div class="flex flex-col items-center">
					<span>extensions</span>
					<span class=" text-xs opacity-50"
						><span class="text-success">bought</span> |
						<span class="text-error">available</span></span
					>
				</div>
			</th>
		</thead>
		<tbody>
			{#each $buildings as building}
				<tr class="">
					<td class="border-2 border-neutral p-1">
						<h5 class="">{building.caption}</h5>
						<span class=" text-xs opacity-70"
							>({#if building.small_building}
								kleine
							{/if}{$buildingDictionary[building.building_type].caption})</span
						>{#if !building.enabled}<span class="bg-black text-white px-1 text-sm">6</span>{/if}
					</td>
					{#if building.personal_count > building.personal_count_target}
						<td class="border-2 border-neutral text-center text-warning"
							>{building.personal_count ?? 0} | {building.personal_count_target ?? 0}
						</td>
					{:else}
						<td class="border-2 border-neutral text-center"
							>{building.personal_count ?? 0} | {building.personal_count_target ?? 0}
						</td>
					{/if}
					<td class="border-2 border-neutral p-1">
						{#each sortExtensionsDictionary(building) as extension}
							{#if isExtensionPurchased(building, extension)}
								<span class="text-success"> {extension.caption} <br /> </span>
							{:else}
								<span class="text-error"> {extension.caption} <br /> </span>
							{/if}
						{/each}
					</td>
					<td> </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
