import type { Action } from 'svelte/action';
import { pb } from '$lib/pocketbase';
import type Record from 'pocketbase';
import type { Unsubscriber } from 'svelte/store';

interface BindFieldOptions {
	table: string;
	recordId: string;
	delay?: number;
}

export const bindField: Action<HTMLInputElement, BindFieldOptions> = (
	node,
	{ table, recordId, delay = 100 }
) => {
	let timeout: NodeJS.Timeout;
	let unsubscribe: Unsubscriber;

	const updateValue = (event: Event) => {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			const inputEvent = event as InputEvent;
			const inputElement = inputEvent.target as HTMLInputElement;
			await pb.collection(table).update(recordId, { [node.name]: inputElement.value });
		}, delay);
	};

	const subscriptionCallback = async ({ action, record }: { action: string; record: Record }) => {
		console.log('subscriptionCallback', action);
		if (action === 'update' || action === 'create') {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			node.value = record[node.name];
		}
	};

	const setupSubscription = async () => {
		// Fetch the initial value
		const initialRecord = await pb.collection(table).getOne(recordId);
		if (initialRecord) {
			node.value = initialRecord[node.name];
		}
		unsubscribe = await pb.collection(table).subscribe(recordId, subscriptionCallback);
	};

	setupSubscription();

	node.addEventListener('input', updateValue);

	return {
		async update({ table: newTable, recordId: newRecordId, delay: newDelay = 750 }) {
			if (table !== newTable || recordId !== newRecordId || delay !== newDelay) {
				unsubscribe?.();
				table = newTable;
				recordId = newRecordId;
				delay = newDelay;

				unsubscribe = await pb.collection(table).subscribe(recordId, subscriptionCallback);
			}
		},
		destroy() {
			clearTimeout(timeout);
			unsubscribe?.();
			node.removeEventListener('input', updateValue);
		}
	};
};
