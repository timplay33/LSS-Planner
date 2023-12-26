<script lang="ts">
	export let data;
</script>

<h2 class="text-2xl">Getting Data...</h2>
{#if data.error != null}
	<span class="text-error">{data.error}</span>
{:else}
	<span class="text-success">data Fetched Successfully</span>
{/if}
