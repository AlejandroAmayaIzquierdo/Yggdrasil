<script lang="ts">
	import { Clock } from '@lucide/svelte';

	let { uptime }: { uptime: number } = $props();
</script>

<div class="w-full bg-secondary p-4 rounded-md space-y-2 border-primary-foreground/10 shadow-md border">
	<div class="space-x-2 gap-2 flex flex-col items-start">
        <div class="flex justify-center gap-2 items-center">
            <Clock class="h-4 w-4 text-muted-foreground" />
            <div class="flex flex-row content-center items-center justify-center">
                <span class="font-semibold">Uptime</span>
            </div>
        </div>
        

		<h1 class="text-4xl text-foreground font-bold font-"
			>{Math.floor(uptime / 86400)}d {Math.floor(uptime / 3600)}h {Math.floor((uptime % 3600) / 60)}m</h1
		>
	</div>
</div>
