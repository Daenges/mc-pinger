import { error } from "@sveltejs/kit";

export class ApiResult {
    public ip : string | undefined;
    public port : string | undefined;
    public version : string | undefined;
    public domain : string = "";
    public playerCur : number = 0;
    public playerMax : number = 0;
    public motd : string = "";
    public iconBase64 : string = "";
    public software : string = "";

    // https://stackoverflow.com/a/37682352
    public constructor(init?:Partial<ApiResult>) {Object.assign(this, init)}
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