<script lang="ts">
    import ServerList from "./ListInitializer/ServerList.svelte";
    import { IpCounter } from "./ListInitializer/IpCounter";
    import { viewport } from "./ListInitializer/useViewportAction";
    import LoadingServerPlaceholder from "./ListInitializer/ServerElements/LoadingServerPlaceholder.svelte";
    export let startIP : string = "127.0.0.1"
    export let scanAmount : number = 1;

    //let serverList : string[];// = IpCounter(startIP, scanAmount) //["gommehd.net", "mc.hypixel.net", "minecraft-asylum.de", "cavetale.com", "brawl.com", "amongus.performium.net", "play.mineheroes.org", "Play.PocketPixels.net", "mc.roleplayhub.com", "play.skyblocknetwork.com", "omegacraft.cl", "gtm.network"];
    let batchlist : Array<Array<string>> = [];
    let ipBatch : string[];
    let autoLoad : boolean = false;

    console.log(scanAmount);

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

<div class="container md:max-w-2xl mx-auto">
    {#each batchlist as servers}
        <ServerList ipArr={servers}/>
    {/each}
    {#if !autoLoad}
        <table class="w-full text-center text-lg" style="font-family: minecraft-regular;">
            <tr>
                <td class="w-1/2 p-2"><button on:click={() => autoLoad=true}      class="bg-gray-300 w-full h-full rounded-xl border-slate-400 border-2">Enable Autoload</button></td>
                <td class="w-1/2 p-2"><button on:click={() => loadMoreServers(false)}  class="bg-gray-300 w-full h-full rounded-xl border-slate-400 border-2">Load {scanAmount} new Servers</button></td>
            </tr>
        </table>
    {:else}
        <div class="flex w-full items-center">
            <div use:viewport on:enterViewport={() => loadMoreServers(false)} class="mx-auto w-full h-fit rounded-lg bg-gray-300 border-slate-400 border-2">
                <LoadingServerPlaceholder/>
            </div>
        </div>
    {/if}
</div>