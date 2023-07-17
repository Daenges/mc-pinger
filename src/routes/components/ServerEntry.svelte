<script lang="ts">
    import ServerImage from "./ServerImage.svelte"
    import ServerProperty from "./ServerProperty.svelte";

    export let ip : string;
    export let motd : string;
    export let version : string;
    export let playersCur : number;
    export let playersMax : number;
    export let pictureBase64 : string = "./pack.webp";

</script>

<div class="md:flex md:max-w-3xl bg-gray-300 rounded-xl overflow-visible items-center mx-auto">
    <table class="m-3">
        <tr>
            <td class="min-w-[64px]"><ServerImage {pictureBase64} /></td>
            
            <td>
                <table class="table-auto border-separate border-spacing-2 max-w-md">
                    <tr>
                        <td><ServerProperty content={"name"} setHTML={false} /></td>
                        <td><ServerProperty content={version} setHTML={false} /></td>
                    </tr>
                    <tr>
                        <td><ServerProperty content={ip} setHTML={false} /></td>
                        <td><ServerProperty content={`${playersCur}/${playersMax}`} setHTML={false} /></td>
                    </tr>
                    <tr>
                        <td colspan="2"><ServerProperty content={motd} setHTML={true} /></td>
                    </tr>      
                </table>
            </td>
        </tr>
    </table>
</div>