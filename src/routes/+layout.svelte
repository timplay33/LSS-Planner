<script>
	import '../app.pcss';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { buildingDictionary } from './stores';
</script>

<Header />

<div class="mx-4 min-h-screen">
	{#if $buildingDictionary[0]?.caption != null}
		<slot />
	{:else}
		<div>Loading...</div>
	{/if}
</div>

<Footer />
