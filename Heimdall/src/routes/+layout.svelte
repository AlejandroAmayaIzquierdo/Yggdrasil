<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Heimdall</title>
</svelte:head>

<div class="min-h-screen flex flex-col justify-start items-center relative bg-background">
	<Toaster richColors />

	<Header />

	{@render children()}
</div>
