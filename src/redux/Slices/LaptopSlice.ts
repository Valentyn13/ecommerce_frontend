import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  ILaptopList, ILaptopsState } from "../../types/laptop.types";

const initialState: ILaptopsState = {
    laptops: []
}

const laptopReducer = createSlice({
    name:'laptops',
    initialState,
    reducers: {
        loadLaptops: (state, action:PayloadAction<ILaptopList>) => {
            state.laptops = action.payload
        }
    }
})

export const {loadLaptops} = laptopReducer.actions;
export default laptopReducer.reducer;