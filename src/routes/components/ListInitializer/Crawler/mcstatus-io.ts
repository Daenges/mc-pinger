import { ApiResult, fetchResult} from "./ApiRequest";

export async function fetch_MCSTATUSIO(serverIp : string) : Promise<ApiResult> {
    return fetchResult(`https://api.mcstatus.io/v2/status/java/${serverIp}`, 
            (json) => {
                if(json["online"] === true) {

                    return new ApiResult ({
                        ip:         serverIp,
                        port:       json["port"],
                        version:    json["version"]["name_clean"],
                        playerCur:  json["players"]["online"] ? json["players"]["online"] : undefined,
                        playerMax:  json["players"]["max"] ? json["players"]["max"] : undefined,
                        motd:       json["motd"]["clean"],
                        iconBase64: json["icon"],
                        software:   json["software"],
                        domain:     json["host"]
                    });
                }
                throw `${serverIp} online: ${json["online"]}`;
            })
}