<script lang="ts">
	import { onMount } from 'svelte';
	import { vehicleDictionary, vehicles, buildings, buildingDictionary, user } from '../stores';

	let error = null;

	//if ($user.session_id != '') {
	const options = {
		method: 'GET',
		headers: {
			Cookie: '_session_id=' + $user.session_id
		}
	};

	onMount(async () => {
		const res_vehicleDictionary = await fetch('https://api.lss-manager.de/de_DE/vehicles');
		const new_vehicleDictionary = await res_vehicleDictionary.json();
		vehicleDictionary.set(new_vehicleDictionary);

		const res_buildingDictionary = await fetch('https://api.lss-manager.de/de_DE/buildings');
		const new_buildingDictionary = await res_buildingDictionary.json();
		buildingDictionary.set(new_buildingDictionary);

		const res_vehicles = await fetch('https://www.leitstellenspiel.de/api/vehicles', options);
		const new_vehicles = await res_vehicles.json();
		vehicles.set(new_vehicles);

		const res_buildings = await fetch('https://www.leitstellenspiel.de/api/buildings', options);
		const new_buildings = await res_buildings.json();
		buildings.set(new_buildings);
	});
	//} else {
	//	error = 'Please provide Session ID before trying to fetch data';
	//}
</script>

<h2 class="text-2xl">Getting Data...</h2>
{#if error != null}
	<span class="text-error">{error}</span>
{:else}
	<span class="text-success">data Fetched Successfully</span>
{/if}
