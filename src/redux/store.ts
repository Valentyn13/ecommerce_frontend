import{configureStore} from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import laptopReducer from './Slices/LaptopSlice'
import { apiSlice } from './Slices/apiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        laptop: laptopReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch