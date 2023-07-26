<script lang="ts">
    import type { ApiResult } from "./ListInitializer/Crawler/ApiRequest";
    import { ResultLog } from "./ListInitializer/Storages"
    // @ts-ignore
    import {base} from "$app/paths";

    function CSVMaker(list : ApiResult[]) : string {
        if(list.length < 1) { throw Error("Object list is too small")}
        
        let csvRows : string[] = [Object.keys(list[0]!).join(',')];
        list.forEach(element => {
            csvRows.push(`"${Object.values(element).join('","')}"`);
        });

        return csvRows.join('\n');
    }

    function downloadCSV(list: ApiResult[]) : void {
        let csvString : string = CSVMaker(list);

        // Create HTML Element to download list as csv file
        const blob = new Blob([csvString], {type: "text/csv"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'ServerList.csv');
        a.click();
    }
</script>

<button on:click={() => downloadCSV(Array.from($ResultLog.values()))} class="p-2 w-3/4 h-full text-center text-xl sm:text-2xl md:text-5xl bg-gray-300 border-2 border-slate-400 rounded-lg mx-auto">
    📥
</button>