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

<div class="md:flex md:max-w-fit bg-gray-300 rounded-xl overflow-visible items-center" role="button">
    <ServerImage {pictureBase64} />
    <div class="m-4 grid grid-rows-2 grid-flow-col gap-3">
        <div class="grid grid-rows-2 grid-flow-col gap-3">
            <ServerProperty content={"name"} setHTML={false} />
            <ServerProperty content={ip} setHTML={false} />
            <ServerProperty content={version} setHTML={false} />
            <ServerProperty content={`${playersCur}/${playersMax}`} setHTML={false} />
        </div>
        <div class="">
            <ServerProperty content={motd} setHTML={true} />
        </div>
    </div>
</div>