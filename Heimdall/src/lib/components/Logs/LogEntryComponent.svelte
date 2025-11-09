
<script lang="ts">
    import type { LogEntry } from '$lib/server/logs';
    import { Clock } from '@lucide/svelte';

    let { log }: { log: LogEntry } = $props();

    const formatDate = (d: Date) => {
        const date = new Date(d);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
</script>


<div class="w-full border-b border-primary-foreground/10 py-2">
    <div class="flex justify-between w-full">
        <div class="flex flex-col">
            <div>
                <span class="font-medium">{log.userName ?? log.userId ?? "<Unknown User>"}</span>
                <span class="text-sm text-muted-foreground"> - {log.action}</span>
            </div>
            <div class="flex justify-center items-center"><Clock class="w-3 h-3 mr-1 inline text-muted-foreground" /> <span class="text-sm text-muted-foreground">{formatDate(log.timestamp)}</span></div>
        </div>
    </div>
</div>