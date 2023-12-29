<script lang="ts">
	import { onMount } from 'svelte';
	import { vehicleDictionary, vehicles, buildings, buildingDictionary, user } from '../stores';

	let error: string = '';

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

		if ($user.session_id != '') {
			let new_user = $user;
			const res_credits = await fetch('/api/' + $user.session_id + '/credits');
			new_user.credits = await res_credits.json();
			user.set(new_user);

			const res_vehicles = await fetch('/api/' + $user.session_id + '/vehicles');
			const new_vehicles = await res_vehicles.json();
			vehicles.set(new_vehicles);

			const res_buildings = await fetch('/api/' + $user.session_id + '/buildings');
			const new_buildings = await res_buildings.json();
			buildings.set(new_buildings);
		} else {
			error = 'error: Please provide a session ID before fetching data.';
		}
	});
</script>

<h2 class="text-2xl">Getting Data...</h2>
{#if error != ''}
	<span class="text-error">{error}</span>
{:else}
	<span class="text-success">data Fetched Successfully</span>
{/if}
