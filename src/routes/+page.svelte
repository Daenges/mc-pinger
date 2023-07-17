<script lang="ts">
    import ServerList from "./components/ServerList.svelte";
    import { IpCounter } from "./components/IpCounter";

    let serverList : string[] = IpCounter("5.83.168.131", 100) //["gommehd.net", "mc.hypixel.net", "minecraft-asylum.de", "cavetale.com", "brawl.com", "amongus.performium.net", "play.mineheroes.org", "Play.PocketPixels.net", "mc.roleplayhub.com", "play.skyblocknetwork.com", "omegacraft.cl", "gtm.network"];

   //console.log(IpCounter("127.0.0.1", 50));

</script>

<div class="container md:max-w-2xl mx-auto space-y-4">
    <ServerList ipArr={serverList}/>    
</div>

