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

<div class="md:flex bg-gray-300 rounded-xl items-center w-full mt-6">
    <table class="m-3 w-full">
        <tr>
            <td class="w-[64px]"><ServerImage {pictureBase64} /></td>
            <td>
                <table class="border-separate border-spacing-2 w-full">
                    <tr>
                        <td><ServerProperty content={servInfo1} setHTML={false} /></td>
                        <td><ServerProperty content={servInfo3} setHTML={false} /></td>
                    </tr>
                    <tr>
                        <td><ServerProperty content={servInfo2} setHTML={false} /></td>
                        <td><ServerProperty content={servInfo4} setHTML={false} /></td>
                    </tr>
                    <tr>
                        <td colspan="2"><ServerProperty content={motd} setHTML={true} /></td>
                    </tr>      
                </table>
            </td>
        </tr>
    </table>
</div>