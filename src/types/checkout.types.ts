import { ILaptopList } from "./laptop.types";

export interface ICustomerAddress {
    city: string;
    street:string;
    postIndex:number;
}

export interface ICustomerData {
    name: string;
    surname: string;
    phone:number;
    address: ICustomerAddress
}

export interface ICheckout {
    customerID: string;
    customerData: ICustomerData
    products:ILaptopList[]
}