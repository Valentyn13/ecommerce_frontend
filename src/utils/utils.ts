import { ICartLaptopList } from "../types/cart.types";

export const total = (arr: ICartLaptopList) =>
arr.reduce((acc, element) => {
  return (acc = acc + element.product.price * element.amount);
}, 0);



export const truncate = (str: string , maxlength: number) => {
  return (str.length > maxlength) ?
      str.slice(0, maxlength - 1) + '…' : str;

}