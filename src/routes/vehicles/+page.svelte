<script>
	import VehicleDisplay from '../VehicleDisplay.svelte';
	import Header from '../Header.svelte';

	export let data;
</script>

<Header />
<div class="m-5">
	<table>
		<thead class="">
			<th class="text-start text-2xl">Fahrzeuge</th>
			<th class="flex flex-col">
				<span>Personnel</span>
				<span class="opacity-50">max | assigned</span>
			</th>
		</thead>
		<tbody>
			{#each data.vehicles as vehicle}
				<VehicleDisplay {vehicle} vehicleDictionary={data.vehicleDictionary} />
			{/each}
		</tbody>
	</table>
</div>
