<script lang="ts">
    import ServerList from "./ListInitializer/ServerList.svelte";
    import { IpCounter } from "./ListInitializer/IpCounter";
    export let startIP : string = "127.0.0.1"
    export let scanAmount : number = 1;

    let serverList : string[] = IpCounter(startIP, scanAmount) //["gommehd.net", "mc.hypixel.net", "minecraft-asylum.de", "cavetale.com", "brawl.com", "amongus.performium.net", "play.mineheroes.org", "Play.PocketPixels.net", "mc.roleplayhub.com", "play.skyblocknetwork.com", "omegacraft.cl", "gtm.network"];
</script>

<div class="container md:max-w-2xl mx-auto space-y-4">
    <ServerList ipArr={serverList}/>
</div>