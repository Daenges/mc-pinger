<script lang="ts">
    import SearchResult from "./components/SearchResult.svelte";

    let startIP : string;
    let scanAmount : string;

    $: console.log(startIP);
</script>

<!---<SearchResult />--->

<div class="flex h-screen mx-auto md:w-1/3 items-center">
    <table>
        <tr>
            <table class="w-full md:h-12 text-xl border-spacing-x-0 rounded-full bg-green-600" style="font-family: minecraft-regular;">
                <tr>
                    <td class="w-3/4 h-full"><input bind:value={startIP} required pattern="^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$" placeholder="Search for servers with similar IPs..." class="pl-5 pr-2 w-full h-full rounded-l-full border-2 border-r-0 border-green-600 placeholder:text-slate-400" type="text"></td>
                    <td class="w-1/4 h-full"><input bind:value={scanAmount} required pattern="^([0-9]|[1-9][0-9]|100)$" placeholder="Amount" class="pr-5 pl-2 w-full h-full rounded-r-full border-2 border-l-0 border-green-600 text-center placeholder:text-slate-400" type="text"></td>
                </tr>
            </table>
        </tr>
        <tr class="flex mt-3">
            <button class="text-white mx-auto w-1/5 h-full bg-green-600 hover:bg-green-700 rounded-lg font-bold text-md">Search</button>
        </tr>
    </table>
</div>