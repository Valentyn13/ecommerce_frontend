import { ILoginData, IRegisterData, IUserFetchData } from "../../../types/user.types";
import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IUserFetchData, ILoginData>({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        // logoutApiCall:builder.mutation({
        //     query:() =>({
        //         url: `${USERS_URL}/logout`,
        //         method: 'GET',
        //     })
        // }),
        register: builder.mutation<IUserFetchData, IRegisterData>({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = userApiSlice;