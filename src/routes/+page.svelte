<script lang="ts">
    import { stringify } from "postcss";
    import ServerEntry from "./components/ServerEntry.svelte";
    export const name : string = "SERVER NAME";

    interface IApiResponse {
        [key: string] : any;
    }

    let ip : string;
    let pictureBase64 : string;
    let version : string;
    let motd : string;
    let software : string;
    let playersCur : number;
    let playersMax : number;

    fetch("https://api.mcsrvstat.us/2/mc.hypixel.net")
        .then((response) => {
            if(response.ok) {
                response.json()
                    .then((result : IApiResponse) => {
                        ip = String(result["ip"]);
                        motd = String(result["motd"]["html"]);
                        version = String(result["version"]);
                        playersMax = result["players"]["max"];
                        playersCur = result["players"]["online"];

                        // May not be included
                        pictureBase64 = result["icon"] ? String(result["icon"]) : "";
                        software = result["software"] ? String(result["software"]) : "Unknown";
                    });
            }
        }
    );

</script>

<div class="">
    <ServerEntry {pictureBase64} {motd} {playersCur} {playersMax} {ip} {version} />
</div>

