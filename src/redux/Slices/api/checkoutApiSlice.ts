import { ICheckout, ICheckoutFetchData, ICheckoutFetchDataList } from "../../../types/checkout.types";
import { apiSlice } from "./apiSlice";

const CHECKOUT_URL = 'api/deals';


export const checkoutApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNewCheckout: builder.mutation<ICheckoutFetchData, ICheckout>({
            query: (data) => ({
                url: `${CHECKOUT_URL}/add`,
                method: "POST",
                body: data
            })
        }),
        getCheckouts: builder.query<ICheckoutFetchDataList,string >({
            query: (data) => ({
                url: `${CHECKOUT_URL}/get`,
                params: { customerID: data }
            })
        })
    })
})

export const { useAddNewCheckoutMutation, useGetCheckoutsQuery } = checkoutApiSlice;