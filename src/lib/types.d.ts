export type Payment = {
    name: string,
    transId: string,
    amount: number,
    CA: string,
    parts: number,
    verified: boolean
}

export type Vtransaction = {
    event:string,
    name: string,
    transId: string,
    amount: number,
    CA: string,
    parts: number,
    verified: boolean
}

export type member = {
    name: string,
    email: string,
    phone: string,
    CA: string
}

export type Data = {[event: string] : transaction[]}
export type userData = User[]


export type User = {
    name:string,
    phone:string,
    college:string,
    email:string,
    gradyear:number,
    stream:string,
    CA:string,
    CAregistrations:string,
    joined:string,
}

export type transaction = {
    members: member[],
    payment: Payment
}