/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FavouriteIintStateType,
  CompateInitStateType,
} from "../redux/Slices/comprasionAndFavouriteSlice";
import { ICartLaptopList } from "../types/cart.types";
import { IFiletersFieldsPrepeared } from "../types/filter.types";

export const total = (arr: ICartLaptopList) =>
  arr.reduce((acc, element) => {
    return (acc = acc + element.product.price * element.amount);
  }, 0);

export const truncate = (str: string, maxlength: number) => {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
};

export const isCheckedHandler = (arr: string[], value: string) => {
  const index = arr.indexOf(value);

  if (index === -1) {
    const newArr = [...arr];
    newArr.push(value);
    return newArr;
  }
  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
};

export const prepearer = (data: any) => {
  const resultObj: any = {};
  const keys = Object.getOwnPropertyNames(data);
  keys.forEach((key) => {
    if (data[key].length > 0) {
      resultObj[key] = data[key];
    }
  });
  return resultObj as IFiletersFieldsPrepeared;
};

export const isInCartExist = (cartElem: ICartLaptopList, id: string) => {
  return () => {
    let exist = false;
    cartElem.forEach((elem) => {
      if (elem.product._id === id) exist = true;
    });
    return exist;
  };
};

export const isInFovouritesExist = (
  favElem: FavouriteIintStateType,
  id: string
) => {
  return () => {
    let exist = false;
    favElem.forEach((elem) => {
      if (elem._id === id) exist = true;
    });
    return exist;
  };
};

export const isInCompareExist = (
  compareElem: CompateInitStateType,
  id: string
) => {
  return () => {
    let exist = false;
    compareElem.forEach((elem) => {
      if (elem._id === id) exist = true;
    });
    return exist;
  };
};
