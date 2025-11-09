import { json, type RequestHandler } from '@sveltejs/kit';
import * as logs from '$lib/server/logs';

export const GET: RequestHandler = async (event) => {
	if (event.locals.user == null) return json({ error: 'Unauthorized' }, { status: 401 });

	const logsData = await logs.getPastLogs();
	return json(logsData);
};
