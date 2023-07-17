<script lang="ts">
    import ServerImage from "./ServerImage.svelte"
    import ServerProperty from "./ServerProperty.svelte";

    export let ip : string;
    export let motd : string;
    export let version : string;
    export let playersCur : number;
    export let playersMax : number;
    export let pictureBase64 : string = "./pack.webp";
    export let software : string = "Unkown Software";

</script>

<div class="md:flex bg-gray-300 rounded-xl items-center w-full mt-6">
    <table class="m-3 w-full">
        <tr>
            <td class="w-[64px]"><ServerImage {pictureBase64} /></td>
            <td>
                <table class="border-separate border-spacing-2 w-full">
                    <tr>
                        <td><ServerProperty content={software} setHTML={false} /></td>
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