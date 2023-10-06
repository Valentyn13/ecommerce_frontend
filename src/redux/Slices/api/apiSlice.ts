import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "https://ecommerce-backend-kzo1yzxlr-valentyn13.vercel.app/" });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User"],
    endpoints: () => ({}),
});
