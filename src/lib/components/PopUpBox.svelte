<script lang="ts">
    import { onMount } from "svelte";
    import { PopUp } from "$lib/PopUp";

    let popUpDialog: HTMLDialogElement;
    export let PopUpObj: PopUp;
    let members = PopUpObj.members;
    let x: any;

    onMount(() => {
        popUpDialog.onclose = (e) => {
            clearInterval(x);
            PopUpObj.isOn = false;
        };
        popUpDialog.showModal();
    });
</script>

<dialog bind:this={popUpDialog}>
    <div class="popUp Box">
        <div class="restBox">
            <p>Members</p>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                {#each members as member,ind}
                    <tr>
                        <td>{ind == 0? "Registered By:" :""}{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.phone}</td>
                    </tr>
                {/each}
            </table>
            <div class="buttonDiv">
                <button
                    on:click={() => {
                        popUpDialog.close();
                    }}>Dismiss</button
                >
            </div>
        </div>
    </div>
</dialog>

<style>
    table{
        padding: 20px;
    }
    td, th{
        text-align: center;
        color: #0fd8d5a0;
    }
    th{
        color: rgb(204, 0, 255);
    }
    button {
        color: white;
        background-color: #7171714a;
        padding: 5px 10px;
        border-radius: 5px;
    }
    p {
        text-align: center;
        margin-top: 10px;
        color: bisque;
        margin-bottom: 5px;
        font-weight: bold;
    }
    dialog {
        position: fixed;
        z-index: 400;
        min-width: 100vw;
        min-height: 100vh;
        display: flex;
        align-items: center;
        margin: 0 !important;
        justify-content: center;
        background-color: #6161614a;
        transition: all 0.3s ease;
    }
    .popUp {
        color: #ede7f6;
        display: flex;
        flex-direction: column;
        position: absolute;
        align-items: center;
        height: auto;
        overflow-x: scroll;
        overflow-y: scroll;
    }

    .restBox {
        flex: 12;
        width: 100%;
        padding-bottom: 20px;
        margin: 0 30px;
        display: flex;
        flex-direction: column;
        background-color: rgba(7, 7, 7, 0.79);
    }

    .Box {
        max-width: 60%;
        max-height: 80%;
        min-width: 300px;
        min-height: 200px;
    }

    .buttonDiv {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-size: 11px;
        bottom: 0px;
        cursor: pointer;
        padding: 5px 0;
        height: 30px;
    }
    button {
        cursor: pointer;
        border: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 900px) {
        .Box {
            max-width: 80%;
        }
    }
</style>
