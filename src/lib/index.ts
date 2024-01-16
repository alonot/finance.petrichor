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
