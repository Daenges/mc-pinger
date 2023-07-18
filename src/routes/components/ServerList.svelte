<script lang="ts">
    import ServerLoader from "./ServerLoader.svelte";

    export let ipArr: string[];
</script>

<div class="flex flex-col ">
    {#each ipArr as ip}
        <ServerLoader serverDomain={ip} />
    {/each}
</div>