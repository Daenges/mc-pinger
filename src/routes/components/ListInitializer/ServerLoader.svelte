<script lang="ts">
    import { onMount } from "svelte";
    import { fetch_MCSRVSTATUS } from "./Crawler/serverstat-us";
    import ServerEntry from "./ServerEntry.svelte";
    import type { ApiResult } from "./Crawler/ApiRequest";
    import { fetch_MCAPINET } from "./Crawler/mc-api-net";
    import { fetch_MCAPIUS } from "./Crawler/mc-api-us";
    import { fetch_MCSTATUSIO } from "./Crawler/mcstatus-io";

    export let serverDomain : string = "mc.hypixel.net";
    let prom : Promise<ApiResult>;
    let requestSuccessful : boolean = true;
    let apis = [fetch_MCAPINET, fetch_MCAPIUS, fetch_MCSRVSTATUS, fetch_MCSTATUSIO]

    function getRandomInt(max: number) : number {
        return Math.floor(Math.random() * max);
    }

    onMount(async function () {
            prom = apis[getRandomInt(apis.length)]!(serverDomain);
        });
</script>

{#if prom !== undefined}
    {#await prom}
        <div class="md:flex bg-slate-600 sm:rounded-xl items-center min-w-fit h-fit w-full mb-6 mx-auto border-gray-700 border-2">
            <div class="md:flex w-full h-full bg-slate-600 animate-pulse md:rounded-xl">
                <table class="w-full h-full">
                    <tr>
                        <td class="w-1/6"><div class="w-24 h-24 bg-slate-500 mx-auto rounded-xl"/></td>
                        <td class="w-5/6">
                            <table class="w-full">
                                <tr>
                                    <td><div class="w-full h-12 bg-slate-500 rounded-xl"/></td>
                                    <td><div class="w-full h-12 bg-slate-500 rounded-xl"/></td>
                                </tr>
                                <tr>
                                    <td><div class="w-full h-12 bg-slate-500 rounded-xl"/></td>
                                    <td><div class="w-full h-12 bg-slate-500 rounded-xl"/></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><div class="w-full h-12 bg-slate-500 rounded-xl"/></td>
                                </tr>      
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    {:then res}
        <ServerEntry 
                pictureBase64={res.iconBase64} 
                motd={res.motd} 
                servInfo1={`${res.domain === "" ? res.ip : res.domain}:${res.port}`} 
                servInfo2={`${res.playerCur} / ${res.playerMax}`} 
                servInfo3={ res.version } 
                servInfo4={ res.software }/>
    {:catch}
        <div></div>
    {/await}
{/if}