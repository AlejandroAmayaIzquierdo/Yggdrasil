<script lang="ts">
      import type { Component } from "svelte";


	let { percentage, title, children }: { percentage: number; title: string; children: any } =
		$props();

    const handleColor = (percentage: number) => {
        if (percentage < 50) return 'bg-green-500';
        if (percentage < 75) return 'bg-yellow-500';
        return 'bg-red-500';
    }
</script>

<div
	class="bg-secondary p-4 rounded-md space-y-2 border-primary-foreground/10 shadow-md w-full border"
>
	<div class="space-x-2 gap-2 flex flex-col items-start">
		<div class="gap-2 flex items-center justify-center">
            {@render children()}
			<span class="font-semibold">{title}</span>
		</div>

		<h1 class="text-4xl text-foreground font-bold font-">{percentage}%</h1>

        <!-- Progress Bar -->
        <div class="w-full bg-primary/10 rounded-full h-2">
            <div
                class={`${handleColor(percentage)} h-2 rounded-full transition-all duration-500 ease-in-out`}
                style="width: {percentage}%;"
            ></div>
        </div>
	</div>
</div>
