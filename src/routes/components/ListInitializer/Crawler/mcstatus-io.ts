import { ApiResult, fetchResult} from "./ApiRequest";

export async function fetch_MCSTATUSIO(serverIp : string) : Promise<ApiResult> {
    return fetchResult(`https://api.mcstatus.io/v2/status/java/${serverIp}`, 
            (json) => {
                if(json["online"] === true) {

                    return new ApiResult ({
                        ip:         serverIp,
                        port:       String(json["port"]),
                        version:    String(json["version"]["name_clean"]),
                        playerCur:  json["players"]["online"] ? json["players"]["online"] : 0,
                        playerMax:  json["players"]["max"] ? json["players"]["max"] : 0,
                        motd:       json["motd"]["html"] ? String(json["motd"]["html"]) : "",
                        iconBase64: json["icon"] ? String(json["icon"]) : "./pack.webp",
                        software:   json["software"] ? String(json["software"]) : "",
                        domain:     json["host"] ? String(json["host"]) : ""
                    });
                }
                throw `${serverIp} online: ${json["online"]}`;
            })
}