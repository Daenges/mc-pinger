import { ApiResult, fetchResult } from "./ApiRequest";

export async function fetch_MCSRVSTATUS(serverIp : string) : Promise<ApiResult> {
    return fetchResult(`https://api.mcsrvstat.us/2/${serverIp}`, 
            (json) => {
                if(json["online"] === true) {
                    return new ApiResult(
                        String(json["ip"]),
                        String(json["port"]),
                        String(json["version"]),
                        json["players"]["online"] ? json["players"]["online"] : 0,
                        json["players"]["max"] ? json["players"]["max"] : 0,
                        json["motd"]["html"] ? String(json["motd"]["html"]) : "",
                        json["icon"] ? String(json["icon"]) : "./pack.webp",
                        json["software"] ? String(json["software"]) : ""
                    );
                }
                throw `${serverIp} online: ${json["online"]}`;
            })
}