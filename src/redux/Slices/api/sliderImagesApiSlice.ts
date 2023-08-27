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
        getSliderImages: builder.mutation({
            query:(data) => ({
                url: `${SLIDER_URL}/getSliderImages`,
                method: 'GET',
                params:{laptopId:data}
            })
        })
    })
})

export const {useAddSliderImagesMutation, useGetSliderImagesMutation} = sliderImagesSlice;