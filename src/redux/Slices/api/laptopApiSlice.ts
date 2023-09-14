import { IFiletersFieldsPrepeared } from "../../../types/filter.types";
import { ILaptop, ILaptopFetchData, ILaptopFetchListData, ILaptopFormData } from "../../../types/laptop.types";
import { apiSlice } from "./apiSlice";

const LAPTOP_URL = 'api/laptop';


export const laptopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addLaptop: builder.mutation<ILaptopFetchData, ILaptopFormData>({
            query: (data) => ({
                url: `${LAPTOP_URL}/add`,
                method: "POST",
                body: data
            })
        }),
        fetchLaptops: builder.query<ILaptopFetchListData, IFiletersFieldsPrepeared>({
            query: (data) => {
                return({
                    url: `${LAPTOP_URL}/all`,
                    params:  data
                })
            }
        }),
        fetchLaptopById: builder.query<ILaptop, string>({
            query: (data) => {
                return({
                    url: `${LAPTOP_URL}/byId`,
                    params:  {id: data}
                })
            }
        })
    })
})

export const { useAddLaptopMutation, useLazyFetchLaptopsQuery, useLazyFetchLaptopByIdQuery } = laptopApiSlice;