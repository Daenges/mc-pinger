<script lang="ts">
    import SearchResult from "./SearchResult.svelte";
    import {StartSearch}  from "./ListInitializer/Storages";

    let startIP : string;
    let scanAmount : string;

    const startIPRegex : RegExp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const scanAmountRegex : RegExp = /^([0-9]|[1-9][0-9]|100)$/;

    let startIPValid : boolean;
    let scanAmountValid : boolean;

    $: startIPValid = startIPRegex.test(startIP);
    $: scanAmountValid = scanAmountRegex.test(scanAmount) && Number(scanAmount) > 0;

    const validateInput = () : boolean => startIPValid && scanAmountValid;

    let annoyingCorner : string;

    $: annoyingCorner = ("placeholder:text-slate-400 pl-5 pr-2 w-full h-full " + (!startIPValid && buttonPressed ? "rounded-bl-xl" : "rounded-l-xl"));

    let buttonPressed: boolean = false;
</script>

<!--- Show search Bar --->
{#if !$StartSearch}
    <div class="flex h-full mx-auto md:w-2/5 min-w-fit items-center">
        <div class="flex w-full max-h-24 bg-gray-300 border-4 rounded-xl border-black p-4 items-end">
            <form action="" class="w-full">
                <table class="md:h-14 md:text-xl sm:text-sm rounded-xl" style="font-family: minecraft-regular;">
                    <!-- Display invalid warnings if input fails Regex -->
                    {#if !validateInput() && buttonPressed}
                        <tr class="text-center items-end truncate">
                            <td>
                                {#if !startIPValid}
                                    <div class="text-white md:animate-slideup bg-rose-500 rounded-t-xl w-full md:p-2 mx-auto">Invalid IPv4!</div>
                                {/if}
                            </td>
                            <td>
                                {#if !scanAmountValid}
                                    <div class="text-white md:animate-slideup bg-rose-500 rounded-t-xl w-full md:p-2 mx-auto">&le; 100!</div>
                                {/if}
                            </td>
                        </tr>
                    {/if}
                    <tr class="mt-5">
                        <td class="w-4/6 h-full"><input bind:value={startIP} placeholder="Search for servers with similar IPs..." class={annoyingCorner} type="text"></td>
                        <td class="w-1/6 h-full"><input bind:value={scanAmount} placeholder="Amount" class="pr-5 pl-2 w-full h-full text-center placeholder:text-slate-400" type="text"></td>
                        <td class="w-1/6 h-full"><button on:click|once={() => buttonPressed=true}  on:click={() => StartSearch.set(validateInput())} class="text-white w-full h-full bg-black focus:bg-gray-800 border-2 border-black rounded-r-xl font-bold py-2 md:text-xl sm:text-sm">Search</button></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
{:else}
    <!--- Start search with provided values --->
    <SearchResult {startIP} scanAmount={Number(scanAmount)} />
{/if}