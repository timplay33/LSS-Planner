<script lang="ts">
	let show_sessionID = false;
	$: type = show_sessionID ? 'text' : 'password';

	import { vehicles, buildings, user } from './stores';
	let NewSessionID = $user.session_id;
	function SaveSessionID() {
		let NewUser = $user;
		NewUser.session_id = NewSessionID;
		user.set(NewUser);

		location.reload(true);
	}

	function onInput(event) {
		NewSessionID = event.target.value;
	}
	function addSepDot(n: number) {
		return n.toLocaleString();
	}
</script>

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
					Name: {$user.credits.user_name}
				</p>
				<p>
					Credits: {#if $user.credits.credits_user_current}{addSepDot(
							$user.credits.credits_user_current
						)}
					{/if}
				</p>
				<p>
					Total Credits: {#if $user.credits.credits_user_total}{addSepDot(
							$user.credits.credits_user_total
						)}
					{/if}
				</p>
				<p>
					Level: {$user.credits.user_level_title}
				</p>
			</div>
		</div>
	</div>
	<div class="mt-96">
		<h3 class="border-t-2 border-neutral text-xl">Settings</h3>
		<ul class="m-4">
			<li class="border-b-2 border-neutral p-2">
				<h4>Session ID</h4>

				<div class="join">
					<input
						{type}
						placeholder="Type your session ID here"
						class="input input-bordered w-80"
						value={NewSessionID}
						on:input={onInput}
					/><button class="btn" type="button" on:click={() => (show_sessionID = !show_sessionID)}
						>{show_sessionID ? 'Hide' : 'Show'}</button
					>
					<button on:click={SaveSessionID} class="btn">Save</button>
				</div>
			</li>
			<li class="border-b-2 border-neutral p-2"><a class="btn" href="/getdata">Update API</a></li>
			<li class="border-b-2 border-neutral p-2">
				<span>more settings soon</span>
			</li>
		</ul>
	</div>
</div>
