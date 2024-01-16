import type { Payment } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('http://petrichor-backend.vercel.app/internal/unvertrid')
    const result = await res.json()
    return {data: result}
};