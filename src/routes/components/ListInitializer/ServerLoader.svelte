<script lang="ts">
    import { onMount } from "svelte";
    import ServerEntry from "./ServerElements/ServerEntry.svelte";
    import { fetch_MCSRVSTATUS } from "./Crawler/serverstat-us";
    import { fetch_MCAPINET } from "./Crawler/mc-api-net";
    import { fetch_MCAPIUS } from "./Crawler/mc-api-us";
    import { fetch_MCSTATUSIO } from "./Crawler/mcstatus-io";
    import { ResultLog } from "./Storages";
    import LoadingServerPlaceholder from "./ServerElements/LoadingServerPlaceholder.svelte";
    import type { ApiResult } from "./Crawler/ApiRequest";

    export let serverDomain : string = "mc.hypixel.net";
    let prom : Promise<ApiResult>;
    
    let cache : {[key: string] : ApiResult};
    ResultLog.subscribe(n => (cache = n));

    let apis = [fetch_MCAPINET, fetch_MCAPIUS, fetch_MCSRVSTATUS, fetch_MCSTATUSIO]

    function getRandomInt(max: number) : number {
        return Math.floor(Math.random() * max);
    }

    // Do request or load data from cache if present on load
    onMount(async function () {
        prom = serverDomain in cache ? Promise.resolve(cache[serverDomain]!) : apis[getRandomInt(apis.length)]!(serverDomain);
    });
</script>

{#if prom !== undefined}
    {#await prom}
        <LoadingServerPlaceholder/>
    {:then res}
        <ServerEntry 
                pictureBase64={res.iconBase64} 
                motd={res.motd} 
                servInfo1={`${res.domain === "" ? res.ip : res.domain}:${res.port}`} 
                servInfo2={`${res.playerCur} / ${res.playerMax}`} 
                servInfo3={ res.version } 
                servInfo4={ res.software }/>
    {:catch}
        <!-- Server could not be found. -->
    {/await}
{/if}