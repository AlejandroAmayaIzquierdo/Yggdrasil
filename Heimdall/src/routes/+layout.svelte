<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Heimdall</title>
</svelte:head>

<div class="min-h-screen flex flex-col justify-start items-center relative bg-background pt-5">
	<Toaster richColors />

	{@render children()}
</div>
