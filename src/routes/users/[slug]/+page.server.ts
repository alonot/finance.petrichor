// import { password, newP } from '$lib/index.server';
import type { Data, Payment, transaction, Vtransaction } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { backend_url, POST } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
    if (params.slug != process.env.pass){
    // if (params.slug != "petrichor"){
        error(404, {message: 'Not Found'})
    }
	const res = await POST(`${backend_url}internal/sheets/users/`,{})
    const result = await res.json()
    return {data: result.data }
};
