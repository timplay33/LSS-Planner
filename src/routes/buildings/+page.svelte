<script>
	import BuildingDisplay from '../BuildingDisplay.svelte';

	export let data;
</script>

<div class="m-5">
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
			{#each data.buildings as building}
				<BuildingDisplay {building} buildingDictionary={data.buildingDictionary} />
			{/each}
		</tbody>
	</table>
</div>
