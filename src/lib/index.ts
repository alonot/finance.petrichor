import type { Data, Vtransaction } from "./types"

export async function POST(url: string, body: any) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export async function reloadData(){
    const res = await POST('http://127.0.0.1:8000/internal/sheets/view/',{})
    const result = await res.json()
    const verified:Vtransaction[] = [];
    const unverified:Vtransaction[] = [];
    if (result.status == 200){
        const data :Data= result.data
        Object.entries(data).forEach(([eventId,transactions])=>{
            transactions.forEach((e)=>{
                if (e.payment.verified){
                    verified.push({
                        "event":eventId,...e.payment})
                }else {
                    unverified.push({
                        "event":eventId,...e.payment})
                }
            })
        })
    }
    // console.log(result.data)
    return {data: result.data,"verified":verified,"unverified":unverified}
}
