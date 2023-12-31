import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartLaptop, ICartLaptopList } from "../../types/cart.types";

const initialState = {
    cartItems: (localStorage.getItem("cartItem")
        ? JSON.parse(localStorage.getItem("cartItem") || "")
        : []) as ICartLaptopList
};

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartLaptop>) => {
            state.cartItems.push(action.payload);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item: ICartLaptop) => item.product._id != action.payload
            );
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
        },

        increaseAmount: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.map((item: ICartLaptop) => {
                if (item.product._id === action.payload) {
                    item.amount += 1;
                }
                return item;
            });
        },

        decreaseAmount: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.map((item: ICartLaptop) => {
                if (item.product._id === action.payload) {
                    if (item.amount <= 1) return item;
                    item.amount -= 1;
                }
                return item;
            });
        },

        clearCart: (state) => {
            state.cartItems = []
            localStorage.setItem('cartItem',JSON.stringify([]))
        }
    },
});

export const { addItem, removeItem, increaseAmount, decreaseAmount, clearCart } =
    cartReducer.actions;
export default cartReducer.reducer;
