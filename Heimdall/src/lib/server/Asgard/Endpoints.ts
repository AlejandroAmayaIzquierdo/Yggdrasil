import { ASGAR_API_URL } from '$env/static/private';

const ENDPOINTS = {
	WAKE_SERVER: `${ASGAR_API_URL}/wake/server`,
	HEALTH_CHECK: `${ASGAR_API_URL}/health`
};

interface HealthCheck {
	status: string;
	uptime: number;
	cpuUsage: number;
	memoryUsage: number;
}

interface HealthCheckResponse {
	status: string;
	uptime: number;
	cpuUsage: number;
	totalMemory: number;
	freeMemory: number;
}

const HealthCheck = async (): Promise<HealthCheck> => {
	try {
		console.log('Performing Health Check');
		console.log(`Health Check Endpoint: ${ENDPOINTS.HEALTH_CHECK}`);
		const response = await fetch(ENDPOINTS.HEALTH_CHECK, {
			method: 'GET'
		});

		const data = (await response.json()) as HealthCheckResponse;

		const usedMemory = data.totalMemory - data.freeMemory;
		const memoryUsage = (usedMemory / data.totalMemory) * 100;

		console.log('Health Check Response:', data);

		return {
			status: data.status,
			uptime: data.uptime,
			cpuUsage: data.cpuUsage,
			memoryUsage: parseFloat(memoryUsage.toFixed(2))
		};
	} catch {
		console.error('Health Check failed');
		return { status: 'ERROR', uptime: 0, cpuUsage: 0, memoryUsage: 0 };
	}
};

export { HealthCheck };
