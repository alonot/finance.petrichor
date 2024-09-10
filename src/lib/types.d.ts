export type Payment = {
    name: string,
    transId: string,
    amount: number,
    phone: string,
    parts: number,
    verified: boolean
}

export type member = {
    name: string,
    email: string,
    phone: string,
    CA: string
}

export type data = {
    data: [
        {
            name: string,
            participants: [
                {
                    user: Payment,
                    members: member[]
                }
            ]
        }
    ]
}