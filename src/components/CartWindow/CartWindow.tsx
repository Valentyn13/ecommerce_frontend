import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";

import { ICartLaptopList } from "../../types/cart.types";

import CartProductList from "../CartProductList/CartProductList";

import "./CartWindow.scss";
import TotalPrice from "../TotalPrcie/TotalPrice";

const CartWindow = () => {
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
      <TotalPrice cartProducts={cartProducts}/>
      <button
        disabled={cartProducts.length > 0 ? false : true}
        className={
          cartProducts.length > 0
            ? "checkout-button"
            : "checkout-button-disabled"
        }
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartWindow;
