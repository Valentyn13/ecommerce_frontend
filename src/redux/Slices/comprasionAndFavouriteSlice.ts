import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ILaptop } from "../../types/laptop.types"




export type FavouriteIintStateType = ILaptop[]
export  type CompateInitStateType =  ILaptop[]
const initialState = {
    favourite: (localStorage.getItem("favourite")
    ? JSON.parse(localStorage.getItem("favourite") || "")
    : []) as FavouriteIintStateType,
    compare: (localStorage.getItem("compare")
    ? JSON.parse(localStorage.getItem("compare") || "")
    : []) as CompateInitStateType,
}

const compareAndFavouriteReducer = createSlice({
    name:'compare&favourite',
    initialState,
    reducers: {
        addFavourite: (state, action:PayloadAction<ILaptop>) => {
            state.favourite.push(action.payload)
            localStorage.setItem("favourite", JSON.stringify(state.favourite))
            console.log(state.favourite.length)
        },
        removeFavourite: (state, action:PayloadAction<string>) => {
            state.favourite = state.favourite.filter((item) => item._id != action.payload)
            localStorage.setItem("favourite", JSON.stringify(state.favourite))
            console.log(state.favourite.length)
        },
        addItemToCompare: (state, action:PayloadAction<ILaptop>) => {
            state.compare.push(action.payload)
            localStorage.setItem("compare", JSON.stringify(state.compare))
        },
        removeItemFromCompateList: (state, action:PayloadAction<string>) => {
            state.compare = state.compare.filter((item) => item._id != action.payload)
            localStorage.setItem("compare", JSON.stringify(state.compare))
        },
        deleteCompareItems: (state) => {
            if (state.compare.length > 2) {
                state.compare = state.compare.filter((_, index) => index < 2)
            }
        }
    }
})


export const {addFavourite, removeFavourite,addItemToCompare, removeItemFromCompateList, deleteCompareItems} = compareAndFavouriteReducer.actions
export default compareAndFavouriteReducer.reducer