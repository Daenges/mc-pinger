<script lang="ts">
    import ServerList from "./ListInitializer/ServerList.svelte";
    import { inview } from 'svelte-inview';
    import { IpCounter } from "./ListInitializer/IpCounter";
    import LoadingServerPlaceholder from "./ListInitializer/ServerElements/LoadingServerPlaceholder.svelte";

    export let startIP : string = "127.0.0.1"
    export let scanAmount : number = 1;

    let batchlist : Array<Array<string>> = [];
    let ipBatch : string[];
    let autoLoad : boolean = false;

    function loadMoreServers(includeStart:boolean) : void {
        console.log(`Loading ${scanAmount} new IPs...`)
        ipBatch = IpCounter(startIP, scanAmount, includeStart);
        startIP = ipBatch.at(-1)!;
    }

    $: batchlist = [
        ...batchlist,
        ipBatch
    ]

    loadMoreServers(true);
</script>

<div class="container md:max-w-2xl mx-auto z-10">
    {#each batchlist as servers}
        <ServerList ipArr={servers}/>
    {/each}
    {#if !autoLoad}
        <table class="w-full h-1/5 text-center text-lg mb-6" style="font-family: minecraft-regular;">
            <tr class="h-full">
                <td class="w-1/2 h-full"><button on:click={() => autoLoad=true}           class="bg-gray-300 w-5/6 h-full rounded-xl border-slate-400 border-2">Enable Autoload</button></td>
                <td class="w-1/2 h-full"><button on:click={() => loadMoreServers(false)}  class="bg-gray-300 w-5/6 h-full rounded-xl border-slate-400 border-2">Load {scanAmount} new Servers</button></td>
            </tr>
        </table>
    {:else}
        <div class="fixed bottom-4 left-0 text-center w-full z-20">
            <button on:click={() => autoLoad=false} class="bg-rose-600 rounded-lg text-white text-lg px-2 h-12 w-fit font-bold animate-shake">Stop Autoload</button>
        </div>
        <div class="flex w-full items-center z-10">
            <div use:inview on:inview_enter={() => loadMoreServers(false)} class="mx-auto w-full h-fit">
                <LoadingServerPlaceholder/>
            </div>
        </div>
    {/if}
</div>