import { apiSlice} from "./apiSlice";

const LAPTOP_URL = 'api/laptop'


export const laptopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addLaptop: builder.mutation({
            query:(data) => ({
                url: `${LAPTOP_URL}/add`,
                method: "POST",
                body: data
            })
        }),
        fetchLaptops: builder.mutation({
            query:() => ({
                url: `${LAPTOP_URL}/add`,
                method: 'GET'
            })
        })
    })
})

export const {useAddLaptopMutation, useFetchLaptopsMutation} = laptopApiSlice;