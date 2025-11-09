<script lang="ts">
	import type { LogEntry } from '$lib/server/logs';
	import LogEntryComponent from './LogEntryComponent.svelte';

	let { logs }: { logs: LogEntry[] } = $props();
</script>

<div
	class="bg-secondary p-4 rounded-md space-y-2 border-primary-foreground/10 shadow-md my-5 w-full border"
>
	<div class="space-x-2 gap-2 flex flex-col items-start">
		<div class="flex flex-col content-start justify-start items-start">
			<h2 class="font-semibold text-lg">Activity Log</h2>
			<span class="text-sm text-muted-foreground">Recent service actions and events</span>
		</div>

        {#each logs as log}
            <LogEntryComponent  {log} />
        {/each}
	</div>
</div>
