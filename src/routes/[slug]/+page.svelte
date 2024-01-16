<script lang="ts">
    import {POST} from '$lib/index'
    export let data;
    let verified: string[] = [];
    let consol = ''
</script>

{#if verified.length > 0}
<button on:click={() => {
    consol = ''
    if (!confirm("Do you really really want to submit. This is irreversible.\nParticipants will get an email regarding their verification in the events immediately")){
        return
    }

    verified.forEach(async (v) => {
        let res = await POST('http://petrichor-backend.vercel.app/internal/verifyTR', {
            TransactionId: v
        })
        let result = await res.json()
        if (result.status == 200){
            consol += `${v} verified\n`
        } else if (result.status == 404){
            consol += `${v} failed\n`
        }
        console.log(result)
    })
}}>Submit</button>
{/if}

<textarea value={consol}></textarea>

<table>
    <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Transaction ID</th>
        <th>No. of Participants</th>
        <th>Amount</th>
        <th>Total Amount</th>
        <th>Verified</th>
    </tr>
    {#each data.data as d}
        <tr>
            <td>{d.name}</td>
            <td>{d.phone}</td>
            <td>{d.transID}</td>
            <td>{d.parts}</td>
            <td>{d.amount}</td>
            <td>{d.amount * d.parts}</td>
            <td><input type="checkbox" on:change={(e) => {
                // @ts-ignore
                if (e?.target?.checked){
                    verified.push(d.transID)
                    verified = verified
                } else {
                    verified = verified.filter((v) => v != d.transID)
                }
            }}></td>
        </tr>
    {/each}
</table>

<style>
    button{
        position: fixed;
        right: 10vw;
        font-size: 50px;
    }
</style>