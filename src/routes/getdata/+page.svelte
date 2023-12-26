<script lang="ts">
	export let data;
	import Header from '../Header.svelte';
</script>

<Header />
<h2 class="text-2xl">Getting Data...</h2>
{#if data.error != null}
	<span class="text-red-600">{data.error}</span>
{:else}
	<span class="text-green-500">data Fetched Successfully</span>
{/if}
