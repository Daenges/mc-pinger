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
    <ServerEntry pictureBase64={res.iconBase64} motd={res.motd} playersCur_Max={`${res.playerCur}/${res.playerMax}`} ip={res.ip} version={res.version} software={res.software} />
{/if}