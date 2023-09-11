import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IPaginationInitialState {
    page: number;
    pageCount: number
}

const initialState: IPaginationInitialState = {
    page: 1,
    pageCount: 0
}

const paginationReducer = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        next: (state) => {
            if (state.page !== state.pageCount) state.page = state.page + 1
        },
        prev: (state) => {
            if (state.page !== 1) state.page = state.page - 1
        },
        setPageCount: (state, action:PayloadAction<number>) => {
            state.pageCount = action.payload
        }
    }
})


export const { next, prev, setPageCount} = paginationReducer.actions;
export default paginationReducer.reducer;