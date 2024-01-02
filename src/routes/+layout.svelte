<script>
	import '../app.pcss';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';

	let buildingDictionary = liveQuery(() => db.buildingDictionary.toArray());
</script>

<Header />

<div class="mx-4 min-h-screen">
	{#if $buildingDictionary}
		<slot />
	{:else}
		<div>Loading...</div>
	{/if}
</div>

<Footer />
