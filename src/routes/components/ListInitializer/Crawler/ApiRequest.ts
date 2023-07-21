import { error } from "@sveltejs/kit";

export class ApiResult {
    public ip : string = "";
    public port : string;
    public version : string = "";
    public domain : string;
    public playerCur : string;
    public playerMax : string;
    public motd : string;
    public iconBase64 : string;
    public software : string;

    // https://stackoverflow.com/a/37682352
    public constructor(init:Partial<ApiResult>) {
        Object.assign(this, init);
        if(this.ip === "" || this.version === "") {
            throw Error(`Unable to create server: IP: ${init.ip} Version: ${init.version}`);
        }
        
        this.port ??= "25565";
        this.domain ??= "";
        this.playerCur ??= "0";
        this.playerMax ??= "0";
        this.motd ??= "No MOTD!"
        // Prevent servers from crafting malicious MOTD HTMLs, since they are directly loaded on the site
        this.motd.replaceAll("<script>", "").replaceAll("href", "");
        this.iconBase64 ??= "./pack.webp"
        this.software ??= "Unknown";
    }
}

export interface IResultConverter {
    (jsonIn : IApiResponse) : ApiResult;
}

export interface IApiResponse {
    [key: string] : any;
}

// Fetch json Result from domain and use custom converter to map it to an ApiResult
export async function fetchResult(requestDomain : string, converter : IResultConverter) : Promise<ApiResult> {
    const response : Response = await fetch(requestDomain);
    if(!response.ok) throw new Error();
    const json : IApiResponse = await response.json();
    return converter(json);
}