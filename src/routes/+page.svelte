<script lang="ts">
    import SearchBox from "./components/SearchBox.svelte";
    import {base} from "$app/paths"
</script>

<table class="h-screen w-screen max-w-full">
    <tr class="h-1/5 w-full text-center text-white" style="background-image: url({base}/img/grass.webp); background-repeat: repeat-x;">
        <img class="mx-auto m-5" src="{base}/img/Server-Scanner.webp" alt="">
    </tr>
    <tr class="w-full h-full">
        <div class="w-full h-1/2 mt-6">
            <SearchBox />
        </div>
    </tr>
    <tr class="h-20 w-full text-center bg-yellow-950 text-white">
        &nbsp;
    </tr>
</table>