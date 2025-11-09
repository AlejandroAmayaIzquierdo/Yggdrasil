<script lang="ts">
    import { Activity, Cpu } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import type { PageServerData } from './$types';
	import ServerStatus from '$lib/components/ServerStatus.svelte';
	import { onMount } from 'svelte';
	import Uptime from '$lib/components/Uptime.svelte';
	import UsagePercentage from '$lib/components/UsagePercentage.svelte';

	let { data }: { data: PageServerData } = $props();

	let serverPower: 'online' | 'offline' = $state('offline');
	let uptime: number = $state(0);
	let cpuUsage: number = $state(0);
	let memoryUsage: number = $state(0);

	const {} = data;

	const handleWake = async () => {
		try {
			const response = await fetch('/api/wake', {
				method: 'POST'
			});

			const result = await response.json();
			console.log(result);

			if (response.ok) {
				toast.success('Wake request sent successfully!');
			} else {
				toast.error(`Failed to send wake request: ${result.message}`);
			}
		} catch (error) {
			console.error('Error sending wake request:', error);
			alert('An error occurred while sending the wake request.');
		}
	};

	const fetchServerStatus = async () => {
		try {
			const response = await fetch('/api/status');
			const result = await response.json();

			if (response.ok) {
				serverPower = result.status === 'OK' ? 'online' : 'offline';
				uptime = result.uptime;
				cpuUsage = result.cpuUsage;
				memoryUsage = result.memoryUsage;
			} else {
				console.error('Failed to fetch server status:', result.message);
				serverPower = 'offline';
				uptime = 0;
				cpuUsage = 0;
				memoryUsage = 0;
			}
		} catch (error) {
			console.error('Error fetching server status:', error);
		}
	};

	if (browser) {
		onMount(() => {
			setTimeout(fetchServerStatus, 1000);
		});
	}
</script>

<!-- <h1>Hi, {user.username}!</h1>
<p>Your user ID is {user.id}.</p> -->

<div class="px-5 w-full">
	<ServerStatus {serverPower} onStart={handleWake} />
	<div class="md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 grid w-full grid-cols-1">
		<Uptime {uptime} />
        <UsagePercentage percentage={cpuUsage} title="CPU Usage">
            <Cpu class="h-4 w-4 text-muted-foreground" />
        </UsagePercentage>
        <UsagePercentage percentage={memoryUsage} title="Memory Usage">
            <Activity class="h-4 w-4 text-muted-foreground" />
        </UsagePercentage>
	</div>
</div>
