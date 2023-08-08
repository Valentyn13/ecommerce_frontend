import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"



const initialState = {
    user: [] as string[],
    loaded: false,
    errors: ''
}

export const asyncHello = createAsyncThunk(
    'userSlice/asyncHello',
    async (_) => {
        return 'Hello'
    }
)


const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers: {
        hello:(state, action: PayloadAction<string>) => {
            state.user.push(action.payload)
        }
    },

    extraReducers:(builder) => {
        builder
        .addCase(asyncHello.pending, (state) => {
            state.loaded = false
        })
        .addCase(asyncHello.rejected, (state) => {
            state.loaded = false
            state.errors = 'error'
        })
        .addCase(asyncHello.fulfilled, (state) => {
            state.loaded = true
            state.errors = ''
        })
    }
})


export const { hello } = userSlice.actions;
export default userSlice.reducer