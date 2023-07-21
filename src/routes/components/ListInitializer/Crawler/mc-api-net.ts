import { ApiResult, fetchResult} from "./ApiRequest";

interface Motd_Object{
    bold:boolean;
    color:string;
    text:string;
}

export async function fetch_MCAPINET(serverIp : string) : Promise<ApiResult> {
    return fetchResult(`https://eu.mc-api.net/v3/server/ping/${serverIp}`, 
            (json) => {
                if(json["online"] === true && json["error"] === undefined) {
                    
                    let motd_str : string = "";
                    if(json["description"]["extra"]) {
                        let obj_list : [Motd_Object] = json["description"]["extra"];
                        obj_list.forEach(obj => motd_str+=obj.text);
                    }
                    else {motd_str="No MOTD";}

                    return new ApiResult ({
                        ip:         serverIp,
                        version:    json["version"]["name"],
                        playerCur:  json["players"]["online"] ? json["players"]["online"] : undefined,
                        playerMax:  json["players"]["max"] ? json["players"]["max"] : undefined,
                        motd:       json["description"].text,
                        iconBase64: json["favicon_base64"]
                    });
                }
                throw `${serverIp} online: ${json["online"]} error: ${json["error"]}`;
            })
}