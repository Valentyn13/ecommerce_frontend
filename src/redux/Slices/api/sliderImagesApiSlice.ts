import { ISliderImagesFetchData } from "../../../types/sliderImages.types";
import { apiSlice} from "./apiSlice";

const SLIDER_URL = 'api/slider'


export const sliderImagesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addSliderImages: builder.mutation({
            query:(data) => ({
                url: `${SLIDER_URL}/addSliderImages`,
                method: "POST",
                body: data
            })
        }),
        getSliderImages: builder.query<ISliderImagesFetchData,string>({
            query:(data) => ({
                url: `${SLIDER_URL}/getSliderImages`,
                params:{laptopId:data}
            })
        })
    })
})

export const {useAddSliderImagesMutation, useLazyGetSliderImagesQuery} = sliderImagesSlice;