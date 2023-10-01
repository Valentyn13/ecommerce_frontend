import { useNavigate } from "react-router-dom";
import { Dispatch, FC, SetStateAction } from "react";

import { useAppSelector } from "../../redux/hooks";
import { ICartLaptopList } from "../../types/cart.types";
import TotalPrice from "../TotalPrcie/TotalPrice";
import CartProductList from "../CartProductList/CartProductList";

import "./CartWindow.scss";

interface ICartWindowProps {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}
const CartWindow: FC<ICartWindowProps> = ({ setIsActive }) => {
  const navigate = useNavigate();

  const cartProducts = useAppSelector(
    (state) => state.cart.cartItems
  ) as ICartLaptopList;

  return (
    <div className="cartWindow">
      {cartProducts.length > 0 ? (
        <CartProductList cartProducts={cartProducts} />
      ) : (
        <div className="empty-cart">Your cart is empty</div>
      )}
      <TotalPrice cartProducts={cartProducts} />
      <button
        disabled={cartProducts.length > 0 ? false : true}
        className={
          cartProducts.length > 0
            ? "checkout-button"
            : "checkout-button-disabled"
        }
        onClick={() => {
          setIsActive(false);
          navigate("/checkout");
        }}
      >
        Checkout
      </button>
      <button
        className="cartWindow__close"
        onClick={() => {
          setIsActive(false);
        }}
      >
        Close cart
      </button>
    </div>
  );
};

export default CartWindow;
