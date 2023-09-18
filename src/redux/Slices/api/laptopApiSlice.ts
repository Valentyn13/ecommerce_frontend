import { IFiletersFieldsPrepeared } from "../../../types/filter.types";
import {
  IEditLaptops,
  ILaptop,
  ILaptopFetchData,
  ILaptopFetchListData,
  ILaptopFormData,
} from "../../../types/laptop.types";
import { apiSlice } from "./apiSlice";

const LAPTOP_URL = "api/laptop";

export const laptopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLaptop: builder.mutation<ILaptopFetchData, ILaptopFormData>({
      query: (data) => ({
        url: `${LAPTOP_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    fetchLaptops: builder.query<ILaptopFetchListData, IFiletersFieldsPrepeared>(
      {
        query: (data) => {
          return {
            url: `${LAPTOP_URL}/all`,
            params: data,
          };
        },
      }
    ),
    fetchLaptopById: builder.query<ILaptop, string>({
      query: (data) => {
        return {
          url: `${LAPTOP_URL}/byId`,
          params: { id: data },
        };
      },
    }),
    deleteLaptop: builder.mutation<ILaptopFetchData, string>({
      query: (data) => ({
        url: `${LAPTOP_URL}/delete/${data}`,
        method: "DELETE",
      }),
    }),
    editLaptop: builder.mutation<ILaptopFetchData, IEditLaptops>({
      query: (data) => ({
        url: `${LAPTOP_URL}/update/${data.id}`,
        method: "PATCH",
        body: data.payload,
      }),
    }),
  }),
});

export const {
  useAddLaptopMutation,
  useLazyFetchLaptopsQuery,
  useLazyFetchLaptopByIdQuery,
  useDeleteLaptopMutation,
  useEditLaptopMutation,
} = laptopApiSlice;
