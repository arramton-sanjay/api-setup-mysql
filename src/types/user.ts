import { Iextra } from "index"

export type TUser = {
    email: string,
    name: string,
    id: number 
}

export interface IUserSearchQuery extends Iextra {
    id?: string | number 
}