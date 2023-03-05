<script>
	import Logo from './Logo.svelte';

	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar
	padding="p-4 fixed w-full"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead">
		<Logo />
	</svelte:fragment>
	<ul class="list-nav flex">
		<li><a href="/login">Login</a></li>
		<li><a href="/signup">Signup</a></li>
	</ul>
	<svelte:fragment slot="trail">
		<LightSwitch height="h-6" />
	</svelte:fragment>
</AppBar>
<slot />
