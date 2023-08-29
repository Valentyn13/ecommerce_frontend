import { ILaptopList } from "../../../types/laptop.types";
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
        fetchLaptops: builder.query<ILaptopList,void>({
            query:() => `${LAPTOP_URL}/all`
        })
    })
})

export const {useAddLaptopMutation, useFetchLaptopsQuery} = laptopApiSlice;