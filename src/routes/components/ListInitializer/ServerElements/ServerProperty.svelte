<script lang="ts">
    export let content : string = "";
    
    function CopyToClipboard() {
        let clipboardString : string = content.replace(/\s+/g,' ').trim();
        navigator.clipboard.writeText(clipboardString);
        console.log(`[CLIPBOARD] << "${clipboardString}"`);
    };
</script>
<div on:keypress={() => CopyToClipboard()} on:click={() => CopyToClipboard()} tabindex=0 role="button" 
    class="h-full px-4 border-2 border-black rounded-md bg-gray-500 text-gray-200 text-base md:text-xl lg:text-2xl sm:text-sm select-all" 
    style="font-family: minecraft-regular;">
    {content}
</div>