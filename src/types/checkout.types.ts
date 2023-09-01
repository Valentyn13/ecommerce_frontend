import { ICartLaptopList } from "./cart.types";

export interface ICustomerAddress {
    country: string
    city: string;
    street: string;
    postIndex: number;
}

export interface ICustomerFormData {
    name: string;
    surname: string;
    phone: number;
    address: ICustomerAddress
}

export interface ICheckout {
    customerID: string;
    customerData: ICustomerFormData;
    products: ICartLaptopList;
    totalPrice: number;
}

export interface ICheckoutFetchData extends ICheckout {
    _id:string;
    __v:number;
}

export type ICheckoutFetchDataList = ICheckoutFetchData[]