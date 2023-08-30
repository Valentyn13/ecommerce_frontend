export interface ISliderImagesFetchData {
    _id: string;
    laptopId: string,
    images: string[]
    __v: number
}


export interface ISliderImagesFormData {
    laptopId: string,
    images: (string | undefined)[]
}