import { password, newP } from '$lib/index.server';
import type { Payment } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
    if (params.slug != password){
        newP()
        error(404, {message: 'Not Found'})
    }
	const res = await fetch('http://petrichor-backend.vercel.app/internal/unvertrid')
    const result = await res.json()
    return {data: result}
};