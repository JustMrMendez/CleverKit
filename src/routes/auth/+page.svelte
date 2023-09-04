<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { enhance, applyAction } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	export let data;

	let email = '';
	let password = '';

	let isGuest = false;

	// parse guest from url params
	$: isGuest = $page.url.searchParams.get('isGuest') === 'true';
	const handleLogin = () => {
		// Login logic here
	};
</script>

<main class="h-full w-full grid place-items-center">
	<div class="card variant-soft space-y-4 shadow-2xl">
		<h1 class="text-center pt-4 font-black card-header">
			{#if isGuest}
				Sign Up
			{:else}
				Log in
			{/if}
		</h1>
		<form
			class="space-y-4 variant-form-material p-4"
			action={isGuest ? '?/register' : '?/login'}
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					pb.authStore.loadFromCookie(document.cookie);
					await applyAction(result);
				};
			}}
		>
			<label for="email" class="label"
				>Email
				<span><input type="email" id="email" name="email" class="input" required /></span>
			</label>
			<label for="password" class="label"
				>Password
				<span><input type="password" id="password" name="password" class="input" required /></span>
			</label>
			{#if isGuest}
			<label for="passwordConfirm" class="label"
			>Confirm Password
			<span><input type="password" id="passwordConfirm" name="passwordConfirm" class="input" required /></span>
		</label>	
		{/if}
			<div class="flex justify-between py-2 items-center">
				{#if isGuest}
					<a href={$page.url.pathname} class="text-sm">Already have an account?</a>
					<button type="submit" class="btn variant-soft">Create</button>
				{:else}
					<a href="?isGuest=true" class="text-sm">Create an account</a>
					<button type="submit" class="btn variant-soft">Login</button>
				{/if}
			</div>
		</form>
		{#if !isGuest}
			<div in:slide={{ delay: 300 }} out:slide class="card-footer text-center">
				<a href="#" class="">Forgot password?</a>
			</div>
		{:else}
			<div in:slide={{ delay: 300 }} out:slide class="card-footer text-center">
				<span class="block">Accounts are disabled by default.</span>
				<a href="#" class="">Rquest access</a>
			</div>
		{/if}
	</div>
</main>
