import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ILaptop } from "./LaptopSlice"

export interface ICartItem<T> {
    amount: number
    product: T
}



const initialState = {
    cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')|| '') : []
}



const cartReducer = createSlice({
    name:'cart',
    initialState,
    reducers: {
       addItem: (state, action: PayloadAction<ICartItem<ILaptop>>) => {
        state.cartItems.push(action.payload)
        localStorage.setItem('cartItem',JSON.stringify(state.cartItems))
       },
       removeItem: (state, action: PayloadAction<string>) => {
        state.cartItems =  state.cartItems.filter((item: ICartItem<ILaptop>) => item.product._id != action.payload)
        localStorage.setItem('cartItem',JSON.stringify(state.cartItems))
       },

       increaseAmount: (state, action: PayloadAction<string>) => {
        state.cartItems =  state.cartItems.map((item: ICartItem<ILaptop>) => {
             if (item.product._id === action.payload) {
                item.amount += 1
             }
             return item
        })
       },

       decreaseAmount: (state, action: PayloadAction<string>) => {
        state.cartItems =  state.cartItems.map((item: ICartItem<ILaptop>) => {
                if (item.product._id === action.payload) {
                    if (item.amount <= 1) return item
                    item.amount -= 1
                }
                return item
        })
       },

    }
})

export const {addItem, removeItem, increaseAmount, decreaseAmount}  = cartReducer.actions;
export default cartReducer.reducer;