import type { Data, Vtransaction } from "./types"

// export const backend_url = "http://127.0.0.1:8000/"
export const backend_url = 'https://petri-back.vercel.app/'
// export const backend_url = 'https://petrichor-backend.vercel.app/'

export let API = {
    addEvent: `${backend_url}/internal/events/add/`,
    updateEvent: `${backend_url}/internal/events/update/`,
    allEvents: `${backend_url}/internal/events/all/`,
    getEvent: `${backend_url}/internal/event/`,
}

export const default_event = {
    eventId: "TP99",
    name: "Name",
    minMember: 1,
    maxMember: 1,
    isTeam: false,
    fee: 0,
    markdown: ""
}

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
    const res = await POST(`${backend_url}internal/sheets/view/`,{})
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


export const pre_components = [
    {
        id: 1,
        name : 'Count',
        type: "svelte",
        source: `
<script>
	export let count = 0;
</script>

<span class="outer">
	<button on:click="{() => count = count - 1}">-</button>
	<span class="inner">{count}</span>
	<button on:click="{() => count = count + 1}">+</button>
</span>

<style>
	.outer {
		background: darkorange;
		height: 20px;
		font-size: 12px;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		transform: translateY(-1px);
		margin: 0 5px;
		border-radius: 3px;
		width: 65px;
		box-shadow: 0 3px 15px 1px rgba(0,0,0,0.3)
  }

	.inner {
		margin: 0 0px;
  }

	button {
		height: 20px;
		padding: 0px 7px 1px 7px;
		margin: 0;
		border: none;
		background: none;
		color: #eee;
		font-weight: bold;
		cursor: pointer;
	}
</style>
`
    },
    {
        id: 1,
        name : 'Section',
        type: "svelte",
        source: `
<div>

    <slot/>
</div>

<style>
    div {
        width: 90%;
        border-radius: 10px;
        margin: 10px;
        box-shadow: 0 0 10px gray;
        padding: 10px;
        background-color: rgb(174, 166, 166);
    }
</style>`
    }
]
