<script lang="ts">
	import { onMount } from 'svelte';
	import { credits, user } from '../stores';
	import { db } from '$lib/db';

	let error: string = '';

	//if ($user.session_id != '') {
	const options = {
		method: 'GET',
		headers: {
			Cookie: '_session_id=' + $user.session_id
		}
	};

	onMount(async () => {
		await db.vehicleDictionary.clear();
		const res_vehicleDictionary = await fetch('https://api.lss-manager.de/de_DE/vehicles');
		const new_vehicleDictionary = await res_vehicleDictionary.json();
		var vehicleDictionaryArray = Object.keys(new_vehicleDictionary).map(
			(key) => new_vehicleDictionary[key]
		);
		vehicleDictionaryArray.forEach((item, i) => {
			item.id = i + 1;
		});
		await db.vehicleDictionary.bulkAdd(vehicleDictionaryArray);

		await db.buildingDictionary.clear();
		const res_buildingDictionary = await fetch('https://api.lss-manager.de/de_DE/buildings');
		const new_buildingDictionary = await res_buildingDictionary.json();
		var buildingDictionaryArray = Object.keys(new_buildingDictionary).map(
			(key) => new_buildingDictionary[key]
		);
		buildingDictionaryArray.forEach((item, i) => {
			item.id = i + 1;
		});
		await db.buildingDictionary.bulkAdd(buildingDictionaryArray);

		if ($user.session_id != '') {
			const res_credits = await fetch('/api/' + $user.session_id + '/credits');
			const new_credits = await res_credits.json();
			credits.set(new_credits);

			await db.vehicles.clear();
			const res_vehicles = await fetch('/api/' + $user.session_id + '/vehicles');
			const new_vehicles = await res_vehicles.json();
			await db.vehicles.bulkAdd(new_vehicles);

			await db.buildings.clear();
			const res_buildings = await fetch('/api/' + $user.session_id + '/buildings');
			const new_buildings = await res_buildings.json();
			await db.buildings.bulkAdd(new_buildings);
		} else {
			error = 'error: Please provide a session ID before fetching data.';
		}
	});
</script>

<div id="options" class="flex w-full justify-between">
	<a class="btn btn-ghost" href="/">&larr;</a>
</div>
<h2 class="text-2xl">Getting Data...</h2>
{#if error != ''}
	<span class="text-error">{error}</span>
{:else}
	<span class="text-success">data Fetched Successfully</span>
{/if}
