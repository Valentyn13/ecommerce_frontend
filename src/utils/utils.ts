import { ICartLaptopList } from "../types/cart.types";

export const total = (arr: ICartLaptopList) =>
arr.reduce((acc, element) => {
  return (acc = acc + element.product.price * element.amount);
}, 0);