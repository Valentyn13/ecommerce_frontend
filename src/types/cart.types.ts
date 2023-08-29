import { ILaptop } from "./laptop.types"

export interface ICartItem<T> {
    amount: number
    product: T
}

export type ICartLaptop = ICartItem<ILaptop>

export type ICartLaptopList = ICartLaptop[]