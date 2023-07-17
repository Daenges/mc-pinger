<script lang="ts">
    import { onMount } from "svelte";
import ServerEntry from "./ServerEntry.svelte";

    export let serverDomain : string = "mc.hypixel.net";

    interface IApiResponse {
        [key: string] : any;
    }

    let errorCount : number = 0;

    let online : boolean;
    let ip : string;
    let pictureBase64 : string;
    let version : string;
    let motd : string;
    let software : string;
    let playersCur : number;
    let playersMax : number;

    onMount(async function () {
        fetch(`https://api.mcsrvstat.us/2/${serverDomain}`)
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((result : IApiResponse) => {
                            online = result["online"];
                            if(online) {
                                ip = String(result["ip"]);
                                version = String(result["version"]);

                                // May not be included
                                if(result["icon"]) {pictureBase64 = String(result["icon"])} else {errorCount++;}
                                if(result["software"]) {software = String(result["software"])} else {errorCount++;}
                                if(result["motd"]["html"]) {motd = String(result["motd"]["html"])} else {errorCount++;}
                                if(result["players"]["max"] && result["players"]["online"]) 
                                {playersMax = result["players"]["max"]; playersCur = result["players"]["online"];} else {errorCount++;}
                            }
                        });
                }
            }
        );
    });
</script>

{#if errorCount <= 2 && online}
    <ServerEntry {pictureBase64} {motd} {playersCur} {playersMax} {ip} {version} {software} />
{/if}