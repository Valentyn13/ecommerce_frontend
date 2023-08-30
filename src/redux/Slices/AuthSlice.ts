import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUserFetchData } from "../../types/user.types";

const initialState = {
    userInfo: (localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "")
        : null) as null | IUserFetchData,
};

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<IUserFetchData>) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.setItem("userInfo", "");
        },
    },
});

export const { setCredentials, logout } = authReducer.actions;
export default authReducer.reducer;
