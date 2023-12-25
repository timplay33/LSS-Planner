<script>
	import BuildingDisplay from '../BuildingDisplay.svelte';
	import Header from '../Header.svelte';

	export let data;
</script>

<Header />

<div class="m-5">
	<table>
		<thead class="">
			<th class="text-start text-2xl">Wachen</th>
			<th class="flex flex-col">
				<span>Personnel</span>
				<span class="opacity-50">count | target</span>
			</th>
			<th class="">extensions</th>
			<th class="">posible extensions</th>
		</thead>
		<tbody>
			{#each data.buildings as building}
				<BuildingDisplay {building} buildingDictionary={data.buildingDictionary} />
			{/each}
		</tbody>
	</table>
</div>
