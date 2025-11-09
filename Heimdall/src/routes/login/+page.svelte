<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 transform">
	<div class="rounded-md shadow-xl bg-card p-5 min-w-[500px] border border-2">
		<h1 class="text-3xl text-primary font-bold">Heimdall login</h1>
		<span class="text-muted-foreground"> Control your home server</span>
		<form method="POST" action="?/login" use:enhance class="mt-5 gap-4 flex flex-col">
			<div class="gap-1 flex flex-col">
				<label for="username" class="text-card-foreground font-semibold">Username</label>
				<input
					id="username"
					name="username"
					type="text"
					required
					class="p-2 rounded-md bg-input text-foreground focus:ring-primary"
				/>
			</div>
			<div class="gap-1 flex flex-col">
				<label for="password" class="text-card-foreground font-semibold">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="p-2 rounded-md bg-input text-foreground focus:ring-primary"
				/>
			</div>
			<button
				type="submit"
				class="mt-4 bg-primary text-primary-foreground font-bold py-2 rounded-md hover:bg-primary/90 transition"
				>Login</button
			>
		</form>

		{#if form?.message}
			<div
				class="mt-4 p-3 rounded-md bg-destructive/10 border-destructive text-destructive-foreground border flex items-center justify-center"
			>
				<span class="font-semibold text-destructive">{form.message}</span>
			</div>
		{/if}
	</div>
</div>
