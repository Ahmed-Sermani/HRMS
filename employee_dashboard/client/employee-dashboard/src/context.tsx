import { createContext } from "react";

export interface Tokens {
    access: string,
    refresh: string
}
export const tokenContext = createContext<Tokens | undefined >(undefined)

export interface ShiftSub{
    is_off_today?: boolean,
    shift?:{
        days_of_week: string,
        polygon:Array<{lng: number, lat: number}>
        _from: string,
        to: string
    },
    checking_info_for_today: {
        checked_in: boolean,
        checked_out: boolean,
        checked_in_time: string,
        checked_out_time: string
    }
}

export const shiftSubContext = createContext<ShiftSub | undefined >(undefined)