import { ILaptopList } from "./laptop.types";

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
    customerData: ICustomerFormData
    products: ILaptopList[]
}