import { HealthCheck } from '$lib/server/Asgard/Endpoints';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	if (event.locals.user == null) return json({ error: 'Unauthorized' }, { status: 401 });

	const { status, uptime, cpuUsage, memoryUsage } = await HealthCheck();

	return json({ status, uptime, cpuUsage, memoryUsage });
};
