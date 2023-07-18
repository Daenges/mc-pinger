import { error } from "@sveltejs/kit";

export class ApiResult {
    ip : string;
    port : string;
    version : string;
    playerCur : number;
    playerMax : number;
    motd : string;
    iconBase64 : string;
    software : string;

    constructor(ip: string, port : string, version : string, playerCur=0, playerMax=0, motd="", iconBase64="./pack.webp", software="") {
        this.ip = ip; this.port=port; this.version=version; this.playerCur=playerCur; this.playerMax=playerMax; this.motd=motd; this.iconBase64=iconBase64; this.software=software;
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