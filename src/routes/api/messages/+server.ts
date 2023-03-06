import type { RequestHandler } from '../$types';
import PocketBase from 'pocketbase';
import { PUBLIC_BACKEND_URL, PUBLIC_DEV_BACKEND_URL } from '$env/static/public';
import { dev } from '$app/environment';

const pb = new PocketBase(dev ? PUBLIC_DEV_BACKEND_URL : PUBLIC_BACKEND_URL);

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.formData();

	const res = await pb
		.collection('messages')
		.create({
			name: body.get('name'),
			message: body.get('message')
		})
		.catch((err) => {
			return err;
		});

	return new Response(JSON.stringify(res), {
		status: 200
	});
};
