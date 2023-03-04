<script>
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar padding="p-4 fixed w-full" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	(title)
	<svelte:fragment slot="trail">
		<LightSwitch height="h-6" />
	</svelte:fragment>
</AppBar>
<slot />
