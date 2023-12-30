<script lang="ts">
	import { user } from './stores';
	import type { User } from './types';

	let show_sessionID = false;
	$: type = show_sessionID ? 'text' : 'password';

	let NewSessionID: string = $user.session_id;

	function SaveSessionID() {
		let NewUser: User = $user;
		NewUser.session_id = NewSessionID;
		user.set(NewUser);
		location.reload(true);
	}

	function onInput(event) {
		NewSessionID = event.target.value.replace(/\//g, '');
	}
</script>

<div class="mt-20">
	<h3 class="border-t-2 border-neutral text-xl">Settings</h3>
	<ul class="m-4">
		<li class="border-b-2 border-neutral p-2">
			<h4>Session ID</h4>

			<div class="">
				{#if $user.session_id != ''}
					{#if !$user.credits?.user_name}
						<span class="text-warning">make shure your session ID is correct</span><br />
					{/if}
				{/if}
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

		<li class="border-b-2 border-neutral p-2">
			<a class="btn" href="/getdata">Update API</a>
		</li>
		<li class="border-b-2 border-neutral p-2">
			<span>more settings soon</span>
		</li>
	</ul>
</div>
