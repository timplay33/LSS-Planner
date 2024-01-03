<script lang="ts">
	import { addSepDot } from '$lib';
	import { liveQuery } from 'dexie';
	let vehiclesCount = liveQuery(() => db.vehicles.count());
	let buildingsCount = liveQuery(() => db.buildings.count());

	import { user, credits } from './stores';
	import Settings from './Settings.svelte';
	import { db } from '$lib/db';
</script>

<div class="">
	<div class="grid">
		<h2 class="text-2xl">Welcome to the LSS-Planner</h2>
		{#if $user && $user.session_id == ''}
			<div>
				<br />
				<p>Let's get started by adding your session ID below in the settings.</p>
				<p>
					don't know what your session ID is or where to find it? <a
						class="text-primary underline"
						href="https://github.com/timplay33/LSS-Planner/wiki/SessionId"
						>find it out in the wiki</a
					>
				</p>
				<p>if you just want to try the Planner you man enter 0 as the session ID to get a demo</p>
			</div>
		{/if}
		<div class="m-4 w-52 border-2 border-neutral">
			<h3 class="text-xl">Algemeine Daten</h3>
			<p>Fahrzeuge: {$vehiclesCount}</p>
			<p>Gebäude: {$buildingsCount}</p>
		</div>
		{#if !$credits?.error && $credits}
			<div class="m-4 w-52 border-2 border-neutral">
				<h3 class="text-xl">User</h3>
				<div>
					<p>
						Name: {$credits.user_name}
					</p>
					<p>
						Credits: {addSepDot($credits.credits_user_current)}
					</p>
					<p>
						Total Credits: {addSepDot($credits.credits_user_total)}
					</p>
					<p>
						Level: {$credits.user_level_title}
					</p>
				</div>
			</div>
		{/if}
	</div>
	<Settings />
</div>
