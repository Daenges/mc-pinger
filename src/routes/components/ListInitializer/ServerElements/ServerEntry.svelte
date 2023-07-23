<script lang="ts">
    import ServerImage from "./ServerImage.svelte"
    import ServerProperty from "./ServerProperty.svelte";

    //  1   3
    //  2   4
    export let servInfo1 : string;
    export let servInfo2 : string; 
    export let servInfo3 : string;
    export let servInfo4 : string; 

    export let motd : string;
    export let pictureBase64 : string;

</script>

<div class="md:flex bg-gray-300 sm:rounded-xl items-center min-w-fit w-full mb-6 border-2 border-slate-400">
    <table class="w-full">
        <tr>
            <td class="w-1/6"><ServerImage {pictureBase64} /></td>
            <td class="w-5/6">
                <table class="w-full">
                    <tr>
                        <td><ServerProperty content={servInfo1}/></td>
                        <td><ServerProperty content={servInfo3}/></td>
                    </tr>
                    <tr>
                        <td><ServerProperty content={servInfo2}/></td>
                        <td><ServerProperty content={servInfo4}/></td>
                    </tr>
                    <tr>
                        <td colspan="2"><ServerProperty content={motd}/></td>
                    </tr>      
                </table>
            </td>
        </tr>
    </table>
</div>