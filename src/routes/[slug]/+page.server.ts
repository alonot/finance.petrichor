// import { password, newP } from '$lib/index.server';
import type { Data, Payment, transaction, Vtransaction } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { POST } from '$lib';

export const load: PageServerLoad = async ({ params, fetch }) => {
    // if (params.slug != process.env.pass){
    //     error(404, {message: 'Not Found'})
    // }
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
    return {data: result.data,"verified":verified,"unverified":unverified}
};
