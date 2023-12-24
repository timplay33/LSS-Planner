<script lang="ts">
	export let data;
</script>

<h1>Getting Data...</h1>
{#if data.error != null}
	<span>{data.error}</span>
{:else}
	<span>data Fetched Successfully</span>
{/if}
