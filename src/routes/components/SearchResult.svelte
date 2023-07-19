<script lang="ts">
    import ServerList from "./ListInitializer/ServerList.svelte";
    import { IpCounter } from "./ListInitializer/IpCounter";

    let serverList : string[] = /*IpCounter("130.61.230.182", 50)*/["gommehd.net", "mc.hypixel.net", "minecraft-asylum.de", "cavetale.com", "brawl.com", "amongus.performium.net", "play.mineheroes.org", "Play.PocketPixels.net", "mc.roleplayhub.com", "play.skyblocknetwork.com", "omegacraft.cl", "gtm.network"];
</script>

<div class="container md:max-w-2xl mx-auto space-y-4">
    <ServerList ipArr={serverList}/>
</div>