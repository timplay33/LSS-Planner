<script lang="ts">
	import { vehicles, buildings, user } from './stores';
	let NewSessionID = $user.session_id;
	function SaveSessionID() {
		let NewUser = $user;
		NewUser.session_id = NewSessionID;
		user.set(NewUser);
	}
</script>

<div class="">
	<div class="grid">
		<h2 class="text-2xl">Welcome to the LSS-Planner</h2>
		<div class="border-neutral m-4 w-52 border-2">
			<h3 class="text-xl">Algemeine Daten</h3>
			<div><span>Fahrzeuge: {$vehicles.length}</span></div>
			<div><span>Gebäude: {$buildings.length}</span></div>
		</div>
	</div>
	<div class="mt-96">
		<h3 class="border-neutral border-t-2 text-xl">Settings</h3>
		<ul class="m-4">
			<li class="border-neutral border-b-2 pb-2">
				<h4>Session ID</h4>

				<div class="join">
					<input
						type="text"
						placeholder="Type your session ID here"
						class="input input-bordered w-80"
						bind:value={NewSessionID}
					/>
					<button on:click={SaveSessionID} class="btn">Save</button>
				</div>
			</li>
			<li class="border-neutral border-b-2 pb-2">
				<span>more settings soon</span>
			</li>
		</ul>
	</div>
</div>
