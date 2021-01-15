import { createContext } from "react";

export interface Tokens {
    access: string,
    refresh: string
}
export const tokenContext = createContext<Tokens | undefined >(undefined)