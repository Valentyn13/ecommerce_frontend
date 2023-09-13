import { FC } from "react";

import CartProduct from "../CartProduct/CartProduct";
import { ICartLaptopList } from "../../types/cart.types";

interface ICartProductListProps {
  cartProducts: ICartLaptopList;
}
const CartProductList: FC<ICartProductListProps> = ({ cartProducts }) => {
  return (
    <>
      {cartProducts.map((product) => {
        return <CartProduct key={product.product._id} product={product} />;
      })}
    </>
  );
};

export default CartProductList;
