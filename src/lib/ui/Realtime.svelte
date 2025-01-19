<script lang="ts">
	export let user: any = {};
</script>

<label class="label">
	<span>Username</span>
	<input class="input" type="text" bind:value={user.username} placeholder="Type your username" />
</label>
