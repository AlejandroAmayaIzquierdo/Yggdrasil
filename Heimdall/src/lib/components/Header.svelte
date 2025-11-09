<script lang="ts">
	import { enhance } from '$app/forms';
	import { RefreshCcw, LogOut } from '@lucide/svelte';

	let refreshing = $state(false);

	const handleRefresh = async () => {
		refreshing = true;
		// Dispatch a custom event to notify parent component to refresh data
		const event = new CustomEvent('refresh');
		dispatchEvent(event);
		// Simulate a delay for refreshing
		setTimeout(() => {
			refreshing = false;
		}, 1000);
	};
</script>

<header
	class="top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-5 sticky z-50 w-full border-b"
>
	<div class="container-wrapper flex flex-1 justify-center">
		<div class="h-14 container flex items-center">
			<div class="flex flex-col items-start">
				<span class="text-lg font-bold">Heimdall</span>
				<span class="text-sm text-muted-foreground"
					>Last updated {new Date().toLocaleDateString()}</span
				>
			</div>
			<div class="gap-2 md:justify-end flex flex-1 items-center justify-between">
				<nav class="gap-2 flex flex-1 items-center justify-end">
					<button
						class="bg-muted px-4 py-1 rounded-sm text-sm font-medium hover:bg-primary hover:text-accent-foreground transition-colors"
						onclick={handleRefresh}
					>
						<RefreshCcw class={`w-4 h-4 mr-1 inline-block ${refreshing ? 'animate-spin' : ''}`} />
						{refreshing ? 'Refreshing...' : 'Refresh'}
					</button>
					<form method="POST" action="?/logout" use:enhance>
						<button
							type="submit"
							class="px-4 py-1 rounded-sm text-sm font-medium hover:bg-muted hover:text-destructive-foreground transition-colors"
							><LogOut class="w-4 h-4 mr-1 inline-block" /> Logout</button
						>
					</form>
				</nav>
			</div>
		</div>
	</div>
</header>
