<script lang="ts">
	export let data;
</script>

<div class="grid">
	<h2 class="text-2xl">Welcome to the LSS-Planner</h2>
	<div class="border-neutral m-4 w-52 border-2">
		<h3 class="text-xl">Algemeine Daten</h3>
		<div><span>Fahrzeuge: {data.vehicles.length}</span></div>
		<div><span>Gebäude: {data.buildings.length}</span></div>
	</div>
</div>
