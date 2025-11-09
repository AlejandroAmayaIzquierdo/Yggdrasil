import { json, type RequestHandler } from '@sveltejs/kit';
import wol from 'wake_on_lan';

export const POST: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	console.log('Wake API called');

	wol.wake('a8:b8:e0:04:0e:b5');

	return json({ success: true });
};
