import { ApiResult, fetchResult} from "./ApiRequest";

export async function fetch_MCSRVSTATUS(serverIp : string) : Promise<ApiResult> {
    return fetchResult(`https://api.mcsrvstat.us/2/${serverIp}`, 
            (json) => {
                if(json["online"] === true) {

                    return new ApiResult ({
                        ip:         json["ip"],
                        port:       json["port"],
                        version:    json["version"],
                        playerCur:  json["players"]["online"] ? json["players"]["online"] : undefined,
                        playerMax:  json["players"]["max"] ? json["players"]["max"] : undefined,
                        motd:       json["motd"]["html"],
                        iconBase64: json["icon"],
                        software:   json["software"],
                        domain:     json["hostname"]
                    });
                }
                throw `${serverIp} online: ${json["online"]}`;
            })
}