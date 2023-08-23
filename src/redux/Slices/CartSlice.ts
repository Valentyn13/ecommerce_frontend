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
       }
    }
})

export const {addItem, removeItem}  = cartReducer.actions;
export default cartReducer.reducer;
