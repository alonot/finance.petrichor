<script lang="ts">
    import PopUpBox from "$lib/components/PopUpBox.svelte";
    import { POST } from "$lib/index";
    import { PopUp} from "$lib/PopUp";
    import type { data, member } from "$lib/types";
    export let data1: data;

    const eventList = [
        "F3: Fireless Food Fiesta",
        "BRUSHED BRILLIANCE",
        "Meta Monologues",
        "Voicestra",
        "Fashion Frenzy ",
        "Waste to wow",
        "Dynamic Duet",
        "ChoreoClash",
        "BGMI Showdown",
        "KATHA - where words become world",
        "CODM: Clash of Champions",
        "KAVYA - weaving verses, crafting dreams",
        "DROP THE BEAT",
        "Pixel Palette",
        "Groove Mania",
        "Click n' Roll: A Showcase of Frames",
        "Enigma - The General Quiz",
        "Bandwagon",
        "Sportify - The SpEnt Quiz",
        "Valorant",
        "Treasure Hunt",
        "Simulate To The Moon",
        "Clench Bot",
        "AlgoTrek",
        "Drone Dash",
        "Game Forge",
        "Kampan ",
        "Trade-a-thon 2.0",
        "WebMosiac",
        "Labyrinth 2.0",
        "Eggstravaganza Drop Challenge",
        "Hover hero challenge",
        "Quizzanaire - School Quiz",
        "Robowar",
        "ChipCraft",
        "AI Workshop",
        "Robotics",
        "Product Management",
        "Reinforcement Learning",
        "Startup and Entrepreneurship",
        "Measurement Principles and Uncertainty Analysis",
        "Competitive Programming",
    ];
    let data = {
        data: [
            {
                name: "F3: Fireless Food Fiesta",
                participants: [
                    {
                        // team: "Team1",
                        user: {
                            name: "hfj",
                            transID: "hfj",
                            amount: 1234,
                            phone: "hfj",
                            parts: 1234,
                            verified: true,
                        },
                        members: [
                            {
                                name: "hey",
                                email: "aj@gmail",
                                phone: "12345",
                                CA: "",
                            },
                            {
                                name: "hey",
                                email: "aj@gmail",
                                phone: "12345",
                                CA: "",
                            },
                            {
                                name: "hey",
                                email: "aj@gmail",
                                phone: "12345",
                                CA: "",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Competitive Programming",
                participants: [
                    {
                        team: "Team1",
                        user: {
                            name: "klsdja;f",
                            transID: "klsdja;f",
                            amount: 47,
                            phone: "klsdja;f",
                            parts: 47,
                            verified: false,
                        },
                        members: [
                            {
                                name: "jfa",
                                email: "dsjfkl",
                                phone: "12345",
                                CA: "",
                            },
                            {
                                name: "jfa",
                                email: "dsjfkl",
                                phone: "12345",
                                CA: "",
                            },
                            {
                                name: "jfa",
                                email: "dsjfkl",
                                phone: "12345",
                                CA: "",
                            },
                        ],
                    },
                ],
            },
        ],
    };
    let verified: string[] = [];
    let consol = "";
    let state = "Unverified";
    let PopUpObj = new PopUp([], false);
    function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        state = target.value;
    }
    const displayPopUp = (members: member[]) => {
        PopUpObj.members = members;
        PopUpObj.isOn = true;
        return;
    };
</script>

{#if verified.length > 0}
    <button
        class="submit"
        on:click={() => {
            consol = "";
            if (
                !confirm(
                    "Do you really really want to submit. This is irreversible.\nParticipants will get an email regarding their verification in the events immediately",
                )
            ) {
                return;
            }

            // verified.forEach(async (v) => {
            POST("https://petrichor-backend.vercel.app/internal/verifyTR", {
                transaction_ids: verified,
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.status == 200) {
                        //result.succes
                        //!result.success => failed trs[]
                        // consol += `${v} verified\n`;
                    } else if (result.status == 404) {
                        // consol += `${v} failed\n`;
                    }
                    console.log(result);
                });
            // });
        }}>Submit</button
    >
{/if}

<!-- <textarea value={consol}></textarea> -->

<select on:change={handleChange}>
    <option value="Unverified">Unverified</option>
    <option value="Verified">Verified</option>
    {#each eventList as e}
        <option value={e}>{e}</option>
    {/each}
</select>

<h1>{state}</h1>
<div class="tb">
    {#if state == "Verified"}
        <table>
            <tr>
                <th>Event</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Transaction ID</th>
                <th>No. of Participants</th>
                <th>Total Amount</th>
            </tr>
            {#each data.data as d}
                {#each d.participants as participant}
                    {#if participant.user.verified}
                        <tr>
                            <td>{d.name}</td>
                            <td>{participant.user.name}</td>
                            <td>{participant.user.phone}</td>
                            <td>{participant.user.transID}</td>
                            <td>{participant.user.parts}</td>
                            <td
                                >{participant.user.amount *
                                    participant.user.parts}</td
                            >
                        </tr>
                    {/if}
                {/each}
            {/each}
        </table>
    {:else if state == "Unverified"}
        <table>
            <tr>
                <th>Event</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Transaction ID</th>
                <th>No. of Participants</th>
                <th>Total Amount</th>
                <th>Verified</th>
            </tr>
            {#each data.data as d}
                {#each d.participants as participant}
                    {#if !participant.user.verified}
                        <tr>
                            <td>{d.name}</td>
                            <td>{participant.user.name}</td>
                            <td>{participant.user.phone}</td>
                            <td>{participant.user.transID}</td>
                            <td>{participant.user.parts}</td>
                            <td
                                >{participant.user.amount *
                                    participant.user.parts}</td
                            >
                            <td
                                ><input
                                    type="checkbox"
                                    on:change={(e) => {
                                        // @ts-ignore
                                        if (e?.target?.checked) {
                                            verified.push(
                                                participant.user.transID,
                                            );
                                            verified = verified;
                                        } else {
                                            verified = verified.filter(
                                                (v) =>
                                                    v !=
                                                    participant.user.transID,
                                            );
                                        }
                                    }}
                                /></td
                            >
                        </tr>
                    {/if}
                {/each}
            {/each}
        </table>
    {:else}
        <table>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Transaction ID</th>
                <th>No. of Participants</th>
                <th>Total Amount</th>
                <th>Verified</th>
                <th>Team</th>
            </tr>
            {#each data.data as d}
                {#if d.name == state}
                    {#each d.participants as participant}
                        <tr>
                            <td>{participant.user.name}</td>
                            <td>{participant.user.phone}</td>
                            <td>{participant.user.transID}</td>
                            <td>{participant.user.parts}</td>
                            <td
                                >{participant.user.amount *
                                    participant.user.parts}</td
                            >
                            {#if participant.user.verified}
                                <td
                                    ><input
                                        type="checkbox"
                                        checked
                                        disabled
                                    /></td
                                >
                            {:else}
                                <td
                                    ><input
                                        type="checkbox"
                                        on:change={(e) => {
                                            // @ts-ignore
                                            if (e?.target?.checked) {
                                                verified.push(
                                                    participant.user.transID,
                                                );
                                                verified = verified;
                                            } else {
                                                verified = verified.filter(
                                                    (v) =>
                                                        v !=
                                                        participant.user
                                                            .transID,
                                                );
                                            }
                                        }}
                                    /></td
                                >
                            {/if}
                            <td
                                ><button
                                    on:click={() =>
                                        displayPopUp(participant.members)}
                                    >View</button
                                ></td
                            >
                        </tr>
                    {/each}
                {/if}
            {/each}
        </table>
    {/if}
</div>

{#if PopUpObj.isOn}
    <PopUpBox bind:PopUpObj />
{/if}

<style>
    .submit {
        position: fixed;
        right: 10vw;
        font-size: 50px;
    }
    table {
        border-spacing: 5rem 1rem;
    }
    td {
        text-align: center;
    }
    .tb {
        display: flex;
        justify-content: center;
    }
    h1 {
        text-align: center;
    }
</style>
