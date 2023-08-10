import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"



const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')|| '') : null
}

export const asyncHello = createAsyncThunk(
    'userSlice/asyncHello',
    async (_) => {
        return 'Hello'
    }
)


const authReducer = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials:(state, action: PayloadAction) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.setItem('userInfo', '')
        }
    },

    extraReducers:(builder) => {
        builder
        .addCase(asyncHello.pending, (state) => {
        })
        .addCase(asyncHello.rejected, (state) => {

        })
        .addCase(asyncHello.fulfilled, (state) => {

        })
    }
})


export const { setCredentials, logout } = authReducer.actions;
export default authReducer.reducer