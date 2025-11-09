<script lang="ts">
	import { Power } from "@lucide/svelte";

     let { serverPower, onStart }: { serverPower: "online" | "offline", onStart?: () => void } = $props();
 </script>


<div class="w-full bg-secondary p-4 rounded-md space-y-2 border border-primary-foreground/10 shadow-md">
     <div class="flex flex-col items-start space-x-2 gap-2 ">
          <div class="flex justify-center flex-row content-center items-center">
               <div class={`w-3 h-3 rounded-full ${serverPower === "online" ? "bg-green-500" : "bg-red-500"}`}></div>
               <span class="ml-2 font-semibold">{serverPower === "online" ? "Server is Online" : "Server is Offline"}</span>
          </div>
          <span class="text-sm text-muted-foreground">{serverPower === "online" ? "Server is online" : "Server is offline"}</span>
          <div class="flex gap-5">
          <button onclick={onStart} class={`mt-2 ${serverPower === "online" ? "bg-primary" : "bg-muted"} text-primary-foreground font-bold py-2 rounded-md hover:bg-primary/90 transition p-2 flex items-center space-x-2`}>
               <Power size={16} />
               <span>Power on</span>
          </button>
          <button class={`mt-2 bg-destructive text-primary-foreground font-bold py-2 rounded-md hover:bg-destructive/90 transition p-2 flex items-center space-x-2`}>
               <Power size={16} />
               <span>Power off</span>
          </button>
          </div>

     </div>
</div>