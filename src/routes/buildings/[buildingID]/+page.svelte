<script>
	import { addSepDot, isExtensionPurchased, sortExtensionsDictionary } from '$lib';
	import { buildingDictionary, buildings } from '../../stores';
	export let data;
	const id = data.params.buildingID;
	let building = $buildings.filter((b) => b.id == id);
	let b = {};
	if (building[0] != undefined && building[0] != null) {
		b = building[0];
	}
	console.log('type:', typeof buildingDictionary);
</script>

<div>
	<h2 class="text-2xl">{b.caption}</h2>
	<ul>
		<li>Gebäude: {$buildingDictionary[b.building_type]?.caption}</li>
		<li>Kosten: {addSepDot($buildingDictionary[b.building_type]?.credits)}</li>
	</ul>
	<div>
		<h3>extensions</h3>
		{#await building[0]}
			<p>loading...</p>
		{:then bu}
			<!--{#each sortExtensionsDictionary(bu, $buildingDictionary) as extension}
				{extension.caption}
				{#if isExtensionPurchased(bu, extension)}
					<span class="text-success"> {extension.caption} <br /> </span>
				{:else}
					<span class="text-error"> {extension.caption} <br /> </span>
				{/if}
			{/each}-->
		{/await}
	</div>
</div>
