import { ApiResult, fetchResult} from "./ApiRequest";

interface Motd_Object{
    bold:boolean;
    color:string;
    text:string;
}

export async function fetch_MCAPIUS(serverIp : string) : Promise<ApiResult> {
    return fetchResult(`https://mcapi.us/server/status?ip=${serverIp}`, 
            (json) => {
                if(json["online"] === true) {

                    let motd_str : string = "";
                    if(json["motd_json"]["extra"]) {
                        let obj_list : [Motd_Object] = json["motd_json"]["extra"];
                        obj_list.forEach(obj => motd_str+=obj.text);
                    }
                    else {motd_str="No MOTD";}

                    return new ApiResult ({
                        ip:         serverIp,
                        version:    String(json["server"]["name"]),
                        playerCur:  json["players"]["now"] ? json["players"]["now"] : 0,
                        playerMax:  json["players"]["max"] ? json["players"]["max"] : 0,
                        motd:       typeof json["motd_json"] === 'string' ? json["motd_json"] : motd_str,
                        iconBase64: String(json["favicon"]),
                        software:   "unknown"
                    });
                }
                throw `${serverIp} online: ${json["online"]}`;
            })
}