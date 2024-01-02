<script lang="ts">
	import { isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';

	let buildings = liveQuery(() => db.buildings.orderBy('caption').toArray());
	let buildingDictionary = liveQuery(() => db.buildingDictionary.toArray());
</script>

<div class="">
	<table class="table table-zebra">
		<thead class="">
			<th class="text-start text-2xl">Wachen</th>
			<th>
				<div class="flex flex-col items-center">
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
								</a>
							</h5>
							<span class=" text-xs opacity-70"
								>({#if building.small_building}
									kleine
								{/if}{$buildingDictionary[building.building_type].caption})</span
							>{#if !building.enabled}<span class="bg-black text-white px-1 text-sm">6</span>{/if}
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
