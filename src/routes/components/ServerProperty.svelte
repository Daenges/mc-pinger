<script lang="ts">
    export let content : string = "";
    export let setHTML : boolean = false;
    
    function CopyToClipboard() {
        let clipboardString : string = setHTML ? content.replace( /(<([^>]+)>)/ig, '').replace(/\s+/g,' ').trim() : content;
        navigator.clipboard.writeText(clipboardString);
        console.log(`[CLIPBOARD] << "${clipboardString}"`);
    };
</script>
<div on:keypress={() => CopyToClipboard()} on:click={() => CopyToClipboard()} tabindex=0 role="button" 
    class="sm:flex h-full items-center px-4 border-2 border-black rounded-md bg-gray-500 text-gray-200" 
    style="font-family: minecraft-regular;">

    {#if setHTML}
        {@html content}
    {:else}
        {content}
    {/if}
</div>