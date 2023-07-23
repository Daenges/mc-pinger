<script lang="ts">
    import { onMount } from "svelte";
    import { fetch_MCSRVSTATUS } from "./Crawler/serverstat-us";
    import ServerEntry from "./ServerElements/ServerEntry.svelte";
    import type { ApiResult } from "./Crawler/ApiRequest";
    import { fetch_MCAPINET } from "./Crawler/mc-api-net";
    import { fetch_MCAPIUS } from "./Crawler/mc-api-us";
    import { fetch_MCSTATUSIO } from "./Crawler/mcstatus-io";
    import { ActiveApiCallCounter } from "./Storages"
    import LoadingServerPlaceholder from "./ServerElements/LoadingServerPlaceholder.svelte";

    export let serverDomain : string = "mc.hypixel.net";
    let prom : Promise<ApiResult>;
    let processCounter : number = 0;
    let apis = [fetch_MCAPINET, fetch_MCAPIUS, fetch_MCSRVSTATUS, fetch_MCSTATUSIO]

    function getRandomInt(max: number) : number {
        return Math.floor(Math.random() * max);
    }

    onMount(async function () {
            prom = apis[getRandomInt(apis.length)]!(serverDomain).finally(() => ActiveApiCallCounter.update((n) => n--));
            ActiveApiCallCounter.update((n) => n++);
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