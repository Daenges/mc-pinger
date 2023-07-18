<script lang="ts">
    import { onMount } from "svelte";
    import { fetch_MCSRVSTATUS } from "./Crawler/serverstatus";
    import ServerEntry from "./ServerEntry.svelte";
    import type { ApiResult } from "./Crawler/ApiRequest";

    export let serverDomain : string = "mc.hypixel.net";
    let res : ApiResult;
    let requestSuccessful : boolean = true;

    onMount(async function () {
        try {
            res = await fetch_MCSRVSTATUS(serverDomain);
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
            servInfo1={`${res.domain === "" ? res.ip : res.domain}:${res.port}`} 
            servInfo2={`${res.playerCur} / ${res.playerMax}`} 
            servInfo3={!res.version || /^\s*$/.test(res.version) ? "unknown" : res.version} 
            servInfo4={ res.software ? res.software : "unknown"}/>
{/if}