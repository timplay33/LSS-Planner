<script>
	import VehicleDisplay from '../VehicleDisplay.svelte';

	export let data;
</script>

<div class="m-5">
	<table>
		<thead class="">
			<th class="text-start text-2xl">Fahrzeuge</th>
			<th class="flex flex-col">
				<span>Personnel</span>
				<span class="w-24 text-xs opacity-50">max | assigned</span>
			</th>
		</thead>
		<tbody>
			{#each data.vehicles as vehicle}
				<VehicleDisplay {vehicle} vehicleDictionary={data.vehicleDictionary} />
			{/each}
		</tbody>
	</table>
</div>
