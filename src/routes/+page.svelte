<script lang="ts">
    import SearchResult from "./components/SearchResult.svelte";

    let startIP : string;
    let scanAmount : string;

    const startIPRegex : RegExp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const scanAmountRegex : RegExp = /^([0-9]|[1-9][0-9]|100)$/;

    let startIPValid : boolean;
    let scanAmountValid : boolean;

    $: startIPValid = startIPRegex.test(startIP);
    $: scanAmountValid = scanAmountRegex.test(scanAmount);

    const validateInput = () : boolean => startIPValid && scanAmountValid;

    let buttonPressed: boolean = false;
    let startSearch : boolean = false;
</script>

<!--- Show search Bar --->
{#if !startSearch}
    <div class="flex h-screen mx-auto md:w-2/5 items-center">
        <div class="w-full h-24 bg-gray-300 border-4 rounded-xl border-black p-4">
            <form action="" class="w-full">
                <table class="mx-auto w-full max-h-fit">
                    <tr>
                        <table class="md:h-14 text-xl rounded-xl" style="font-family: minecraft-regular;">
                            <tr class="mt-5">
                                <td class="w-4/6 h-full"><input bind:value={startIP} placeholder="Search for servers with similar IPs..." class="pl-5 pr-2 w-full h-full rounded-l-xl placeholder:text-slate-400" type="text"></td>
                                <td class="w-1/6 h-full"><input bind:value={scanAmount} placeholder="Amount" class="pr-5 pl-2 w-full h-full text-center placeholder:text-slate-400" type="text"></td>
                                <td class="w-1/6 h-full"><button on:click|once={() => buttonPressed=true}  on:click={() => startSearch=validateInput()} class="text-white w-full h-full bg-black focus:bg-gray-800 border-2 border-black rounded-r-xl font-bold py-2 text-md">Search</button></td>
                            </tr>
                            {#if !validateInput() && buttonPressed}
                                <tr class="text-center">
                                    <td>
                                        {#if !startIPValid}
                                            <div class="text-white md:animate-shake bg-rose-500 rounded-b-xl w-full p-2 mx-auto">Invalid IPv4!</div>
                                        {/if}
                                    </td>
                                    <td>
                                        {#if !scanAmountValid}
                                            <div class="text-white md:animate-shake bg-rose-500 rounded-b-xl w-full p-2 mx-auto">&le; 100!</div>
                                        {/if}
                                    </td>
                                </tr>
                            {/if}
                        </table>
                    </tr>
                </table>
            </form>
        </div>
    </div>
{:else}
    <!--- Start search with provided values --->
    <SearchResult />
{/if}