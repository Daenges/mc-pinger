<script lang="ts">
    import ServerList from "./ListInitializer/ServerList.svelte";
    import { inview } from 'svelte-inview';
    import { IpCounter } from "./ListInitializer/IpCounter";
    import type { ApiResult } from "./ListInitializer/Crawler/ApiRequest";
    import { ResultLog, StartSearch } from "./ListInitializer/Storages";
    import LoadingServerPlaceholder from "./ListInitializer/ServerElements/LoadingServerPlaceholder.svelte";
    import { onMount } from "svelte";

    export let startIP : string = "127.0.0.1"
    export let scanAmount : number = 1;

    let batchlist : Array<Array<string>> = [];
    let ipBatch : string[];
    let selectedVersion : string = "All";
    let selectedOnlinePlayers : string = "";
    const regexPlayers : RegExp = /^(<\d+|>\d+|\d+)$/;
    let selectedMOTDContent : string = "";

    // Automatically load new servers
    let autoLoad : boolean = false;

    function loadMoreServers(includeStart:boolean) : void {
        console.log(`Loading ${scanAmount} new IPs...`)
        ipBatch = IpCounter(startIP, scanAmount, includeStart);
        startIP = ipBatch.at(-1)!;
    }

    // Set of all versions seen up to this point, sorting reasons
    $: versions = Array.from(new Set(Array.from($ResultLog.values()).map(entry => entry.version))).sort();
    // list of all pinged IPs up to this point
    $: batchlist = [...batchlist, ipBatch]
    
    // Seperate function to avoid unforseen updates
    function updateBatchlist() : void {
        ipBatch = [];
        let tempList : ApiResult[] = Array.from($ResultLog.values());

        // Evaluate Version
        if(selectedVersion !== "All") {tempList = tempList.filter(entry => entry.version === selectedVersion)}

        // Evaluate MOTD
        if(selectedMOTDContent !== "") {tempList = tempList.filter(entry => entry.motd.includes(selectedMOTDContent))}

        // Evaluate Player Counts
        if(selectedOnlinePlayers !== "" && regexPlayers.test(selectedOnlinePlayers)) {
            if(selectedOnlinePlayers.startsWith('<')) {tempList = tempList.filter(entry => Number(entry.playerCur) < Number(selectedOnlinePlayers.substring(1)))}
            else if(selectedOnlinePlayers.startsWith('>')) {tempList = tempList.filter(entry => Number(entry.playerCur) > Number(selectedOnlinePlayers.substring(1)))}
            else {tempList = tempList.filter(entry => Number(entry.playerCur) === Number(selectedOnlinePlayers))}
        }
        batchlist = [tempList.map(entry => entry.ip)];
    }

    $: {
        if(selectedVersion !== "All" || selectedMOTDContent !== "" || regexPlayers.test(selectedOnlinePlayers)) {
            updateBatchlist();
        } 
        else {
            batchlist = [Array.from($ResultLog.values()).map(entry => entry.ip)];
        }
    }

    onMount(() => loadMoreServers(false));
</script>

<div class="container max-w-fit md:max-w-3xl 2xl:max-w-5xl mx-auto z-10">
    <!-- Control Bar -->
    <div class="flex flex-row w-full h-12 md:h-16 bg-black rounded-lg mb-6 items-center overflow-x-hidden sm:text-xs md:text-lg" style="font-family: minecraft-regular;">
        <button on:click={() => {StartSearch.set(false)}} class="text-white h-full bg-rose-600 w-1/4 md:w-1/5 text-center">Back</button>
        <select bind:value={selectedVersion} class="h-full w-1/4 md:w-1/5 text-center">
            <option value="All">All</option>
            {#each versions as ver}
                <option value={ver}>{ver}</option>
            {/each}
        </select>
        <input type="text" bind:value={selectedOnlinePlayers} placeholder="Players" class="w-1/4 md:w-1/5 h-full pl-1 pr-1 mr-1 text-center placeholder:text-slate-400">
        <input type="text" bind:value={selectedMOTDContent} placeholder="MOTD" class="w-1/4 md:w-2/5 h-full pr-2 pl-1 rounded-r-lg text-center">
    </div>

    <!-- Main Server List -->
    {#each batchlist as servers (servers)}
        <ServerList ipArr={servers}/>
    {/each}

    {#if !autoLoad}
        <!-- Trigger Buttons further loading -->
        <table class="w-full h-1/5 text-center text-lg mb-6" style="font-family: minecraft-regular;">
            <tr class="h-full">
                <td class="w-1/2 h-full"><button on:click={() => autoLoad=true}           class="bg-gray-300 w-5/6 h-full rounded-xl border-slate-400 border-2">Enable Autoload</button></td>
                <td class="w-1/2 h-full"><button on:click={() => loadMoreServers(false)}  class="bg-gray-300 w-5/6 h-full rounded-xl border-slate-400 border-2">Load {scanAmount} new Servers</button></td>
            </tr>
        </table>
    {:else}
        <!-- Stop Button -->
        <div class="fixed bottom-4 left-0 text-center w-full z-20">
            <button on:click={() => autoLoad=false} class="bg-rose-600 rounded-lg text-white text-lg px-2 h-12 w-fit font-bold animate-shake">Stop Autoload</button>
        </div>
        <!-- Autoload DIV -->
        <div class="flex w-full items-center z-10">
            <div use:inview on:inview_enter={() => loadMoreServers(false)} class="mx-auto w-full h-fit">
                <LoadingServerPlaceholder/>
            </div>
        </div>
    {/if}
</div>