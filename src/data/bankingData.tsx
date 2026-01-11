export interface User{
    userName: string,
    password: string,
    accNumber: number,
    isLoggedIn: boolean,
    balance: number,
    email: string,
    
    
}
export interface Movements{
    id: number,
    fromAccId: number,
    toAccId: number,
    amount: number,
    type: string,
    date:string
    
}