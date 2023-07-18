<script lang="ts">
    import { onMount } from "svelte";
    import { fetch_MCSRVSTATUS } from "./Crawler/serverstat-us";
    import ServerEntry from "./ServerEntry.svelte";
    import type { ApiResult } from "./Crawler/ApiRequest";
    import { fetch_MCAPINET } from "./Crawler/mc-api-net";
    import { fetch_MCAPIUS } from "./Crawler/mc-api-us";
    import { fetch_MCSTATUSIO } from "./Crawler/mcstatus-io";

    export let serverDomain : string = "mc.hypixel.net";
    let res : ApiResult;
    let requestSuccessful : boolean = true;

    onMount(async function () {
        try {
            res = await fetch_MCSTATUSIO(serverDomain);
        }
        catch(error) {
            requestSuccessful = false;
            console.info(error)
        }
        
        });
</script>

{#if requestSuccessful && res != undefined}
    <ServerEntry 
            pictureBase64={res.iconBase64} 
            motd={res.motd} 
            servInfo1={`${res.domain === "" ? res.ip : res.domain}:${res.port !== undefined ? res.port : "25565"}`} 
            servInfo2={`${res.playerCur} / ${res.playerMax}`} 
            servInfo3={!res.version || /^\s*$/.test(res.version) ? "unknown" : res.version} 
            servInfo4={ res.software ? res.software : "unknown"}/>
{/if}