<script lang="ts">
	import { bindField } from './../../lib/actions/bindField.ts';
	import type Record from 'pocketbase';
	import { currentUser } from '$lib/stores/user';

	import { pb } from '$lib/pocketbase';
	import { onDestroy } from 'svelte';

	pb.collection('users').subscribe($currentUser?.id, async (e) => {
		currentUser.set(e.record);
	});

	onDestroy(() => {
		pb.collection('users').unsubscribe($currentUser?.id);
	});
</script>


<div class="container h-full mx-auto flex flex-col gap-4 justify-center items-center">
	<!-- big text CleverKit Logo-->
	<h1 class="text-primary-600-300-token !text-7xl font-bold text-center">
		Clever<span class="text-error-600-300-token">Kit</span>
	</h1>
	<label class="label">
		<span>Username</span>
		<input
			class="input"
			type="text"
			name="username"
			use:bindField={{ table: 'users', recordId: $currentUser?.id, delay: 750 }}
			placeholder="Type your username"
		/>
	</label>
	{#if $currentUser?.username}
		<p class="text-center">Hello, {$currentUser.username}</p>
	{/if}
	<div class="text-center">
		<p>A SvelteKit Starter Kit</p>
		<p>with TailwindCSS, Skeleton, and more</p>
	</div>
</div>
