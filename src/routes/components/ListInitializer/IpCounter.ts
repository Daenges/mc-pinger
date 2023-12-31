export function IpCounter(start: string, amount: number, includeStart:boolean=false) : string[] {

    if(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(start) && amount > 0) {
        let splitStartIp : string[] = start.split('.');
        let currentIp : number[] = [Number(splitStartIp[0]), Number(splitStartIp[1]), Number(splitStartIp[2]), Number(splitStartIp[3])];
        let returnArray : string[] = [];
        
        if (includeStart) {
            returnArray.push(`${currentIp[0]}.${currentIp[1]}.${currentIp[2]}.${currentIp[3]}`);
        }

        for(let i=0; i < amount; i++) {
            
            currentIp[3]++;
            for(let j = currentIp.length-1; j > 0; j--) {
                
                if(j === 0 && currentIp[j] === 255) {
                    currentIp[j] = 0;
                }
                else if(currentIp[j]! > 255) {
                    currentIp[j - 1]++;
                    currentIp[j] = 0;
                }
            }
            returnArray.push(`${currentIp[0]}.${currentIp[1]}.${currentIp[2]}.${currentIp[3]}`);
        }

        return returnArray;
    }
    throw new Error("Wrong IP format");
}