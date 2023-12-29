<script lang="ts">
	import { addSepDot, isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import type { Building } from '@lss-manager/missionchief-type-definitions/src/api/Building';
	import { buildingDictionary, buildings } from '../../stores';
	export let data;
	const id: number = Number(data.params.buildingID);
	let building: Array<Building>;
	building = $buildings.filter((b) => b.id == id);
	let b: Building;
	if (building[0] != undefined && building[0] != null) {
		b = building[0];
	}
</script>

<div>
	<h2 class="text-2xl">{b?.caption}</h2>
	<ul>
		<li>Gebäude: {$buildingDictionary[b?.building_type]?.caption}</li>
		<li>Kosten: {addSepDot($buildingDictionary[b?.building_type]?.credits || 0)}</li>
	</ul>
	<div>
		<h3>extensions</h3>

		<!--{#each sortExtensionsDictionary(bu, $buildingDictionary) as extension}
				{extension.caption}
				{#if isExtensionPurchased(bu, extension)}
					<span class="text-success"> {extension.caption} <br /> </span>
				{:else}
					<span class="text-error"> {extension.caption} <br /> </span>
				{/if}
			{/each}-->
	</div>
</div>
