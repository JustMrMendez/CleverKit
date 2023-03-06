<script lang="ts">
	import { enhance } from '$app/forms';
	import PocketBase from 'pocketbase';
	import { dev } from '$app/environment';
	import { PUBLIC_BACKEND_URL, PUBLIC_DEV_BACKEND_URL } from '$env/static/public';
	import { onDestroy, onMount, tick } from 'svelte';
	import { messages } from '$lib/stores/stores';
	import { PaperAirplane, Trash } from 'svelte-heros-v2';
	import { fade, fly, slide } from 'svelte/transition';

	const pb = new PocketBase(dev ? PUBLIC_DEV_BACKEND_URL : PUBLIC_BACKEND_URL);

	let unsubscribe: () => void;
	let messagesCounter = 0;

	onMount(async () => {
		unsubscribe = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				$messages = [...$messages, record];
			}
			if (action === 'delete') {
				$messages = $messages.filter((n) => n.id !== record.id);
			}
		});
	});

	async function getMessages() {
		onMount(async () => {
			const oldMessages = await pb.collection('messages').getList();
			messages.set(oldMessages.items);
			messagesCounter = oldMessages.items.length;
		});
	}

	async function deleteMessage(id: string) {
		await pb.collection('messages').delete(id);
	}

	$: messagesCounter = $messages.length;
	$: console.log($messages);
	onDestroy(() => {
		unsubscribe?.();
	});

	let messagesNode: HTMLElement;

	async function scrollToBottom(node: HTMLElement) {
		await tick();
		node.scroll({
			top: node.scrollHeight,
			behavior: 'smooth'
		});
		scroll();
	}

	$: {
		if ($messages.length > 0) {
			scrollToBottom(messagesNode);
		}
	}
</script>

<div class="grid grid-rows-[1fr_200px] h-full">
	{#await getMessages()}
		<div class="flex items-center justify-center">
			<div
				class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
			/>
		</div>
	{:then}
		<div
			bind:this={messagesNode}
			class="card p-10 space-y-4 overflow-y-scroll flex flex-col h-full"
			transition:fade|local
		>
			{#each $messages as message}
				<dl in:slide|local out:fade|local={{duration: 150}} class="list-dl">
					<div>
						<span class="badge bg-primary-500">💀</span>
						<span class="flex-auto">
							<dt>{message.name}</dt>
							<dd>{message.message}</dd>
						</span>
						<span>
							<button
								type="button"
								class="btn hover:variant-soft rounded-full aspect-square p-2"
								on:click={() => deleteMessage(message.id)}
							>
								<Trash size="16" variation="solid" />
							</button>
						</span>
					</div>
				</dl>
			{/each}
		</div>
	{/await}
	<form
		method="post"
		action="/api/messages"
		use:enhance={() => {
			return async ({ update, form }) => {
				form.reset();
				await update();
			};
		}}
		class="card px-10 py-4"
	>
		<input type="hidden" name="name" value="Mendez" class="input" />
		<label class="label"
			><span>Username</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto] variant-ghost-surface">
				<input type="text" name="message" placeholder="Enter your message..." class="" />
				<button type="submit" class="btn bottom-2 right-0 -rotate-45 text-secondary-500-400-token">
					<span class="" tabindex="-1">
						<PaperAirplane size="24" variation="solid" tabindex="-1" />
					</span>
				</button>
			</div></label
		>
		<!-- <label class="label relative"
			><span>Textarea</span>
			<input
				name="message"
				class="textarea resize-none "
				placeholder="Enter your message"
			/>
			<button type="submit" class="btn absolute bottom-2 right-0 -rotate-45 text-secondary-500">
				<PaperAirplane size="24" variation="solid" />
			</button>
		</label> -->
	</form>
</div>
