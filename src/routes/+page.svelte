<script lang="ts">
	export let data;
</script>

<h2 class="text-2xl">Fahrzeuge</h2>
<ul>
	{#each data.vehicles as vehicle}
		<li class="flex items-center gap-1">
			<h5>{vehicle.caption}</h5>
			<span class="text-xs opacity-50"
				>({data.vehicleDictionary[vehicle.vehicle_type].caption})</span
			>
		</li>
	{/each}
</ul>
