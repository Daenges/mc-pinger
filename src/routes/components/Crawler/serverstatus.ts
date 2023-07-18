import { ApiResult, fetchResult } from "./ApiRequest";

export async function fetch_MCSRVSTATUS(serverIp : string) : Promise<ApiResult> {
    return fetchResult(`https://api.mcsrvstat.us/2/${serverIp}`, 
            (json) => {
                if(json["online"] === true) {
                    return new ApiResult ({
                        ip:         String(json["ip"]),
                        port:       String(json["port"]),
                        version:    String(json["version"]),
                        playerCur:  json["players"]["online"] ? json["players"]["online"] : 0,
                        playerMax:  json["players"]["max"] ? json["players"]["max"] : 0,
                        motd:       json["motd"]["html"] ? String(json["motd"]["html"]) : "",
                        iconBase64: json["icon"] ? String(json["icon"]) : "./pack.webp",
                        software:   json["software"] ? String(json["software"]) : "",
                        domain:     json["hostname"] ? String(json["hostname"]) : String(json["ip"])
                    });
                }
                throw `${serverIp} online: ${json["online"]}`;
            })
}