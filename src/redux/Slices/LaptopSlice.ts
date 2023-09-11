import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILaptopPayload, ILaptopsState } from "../../types/laptop.types";

const initialState: ILaptopsState = {
    laptops: [],
    pageCount: 0,
    isLoadSuccess:false
}

const laptopReducer = createSlice({
    name: 'laptops',
    initialState,
    reducers: {
        loadLaptops: (state, action: PayloadAction<ILaptopPayload>) => {
            state.laptops = action.payload.laptops
            state.isLoadSuccess = action.payload.isLoadSuccess
            state.pageCount = action.payload.pageCount
        }
    }
})

export const { loadLaptops } = laptopReducer.actions;
export default laptopReducer.reducer;