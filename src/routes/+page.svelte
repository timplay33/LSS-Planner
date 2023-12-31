<script lang="ts">
	import { addSepDot } from '$lib';

	import { vehicles, buildings, user, buildingDictionary } from './stores';
	import Settings from './Settings.svelte';
</script>

{#if $user.session_id != ''}
	<div class="">
		<div class="grid">
			<h2 class="text-2xl">Welcome to the LSS-Planner</h2>
			<div class="m-4 w-52 border-2 border-neutral">
				<h3 class="text-xl">Algemeine Daten</h3>
				<p>Fahrzeuge: {$vehicles.length}</p>
				<p>Gebäude: {$buildings.length}</p>
			</div>
			<div class="m-4 w-52 border-2 border-neutral">
				<h3 class="text-xl">User</h3>
				<div>
					<p>
						Name: {$user.credits?.user_name || ''}
					</p>
					<p>
						Credits: {#if $user.credits?.credits_user_current}{addSepDot(
								$user.credits?.credits_user_current
							)}
						{/if}
					</p>
					<p>
						Total Credits: {#if $user.credits?.credits_user_total}{addSepDot(
								$user.credits?.credits_user_total
							)}
						{/if}
					</p>
					<p>
						Level: {$user.credits?.user_level_title || ''}
					</p>
				</div>
			</div>
		</div>
		<Settings />
	</div>
{:else}
	<div>
		<div>
			<h2 class="text-xl">Welcome to the LSS-Planner</h2>
			<br />
			<p>Let's get started by adding your session ID below in the settings.</p>
			<p>
				don't know what your session ID is or where to find it? <a
					class="text-primary underline"
					href="https://github.com/timplay33/LSS-Planner/wiki/SessionId">find it out in the wiki</a
				>
			</p>
		</div>
		<Settings />
	</div>
{/if}
