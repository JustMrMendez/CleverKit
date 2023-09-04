import { dev } from '$app/environment';
import { PUBLIC_BACKEND_URL, PUBLIC_DEV_BACKEND_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export function createInstance() {
	return new PocketBase(dev ? PUBLIC_DEV_BACKEND_URL : PUBLIC_BACKEND_URL);
}

export const pb = createInstance();
