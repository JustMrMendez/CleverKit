<script>
	import Logo from '$lib/shared/Logo.svelte';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar
	padding="p-4 w-full"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead">
		<Logo />
	</svelte:fragment>
	<ul class="list-nav flex">
		<li><a href="/auth">Login</a></li>
	</ul>
	<svelte:fragment slot="trail">
		<LightSwitch height="h-6" />
	</svelte:fragment>
</AppBar>
<slot />
