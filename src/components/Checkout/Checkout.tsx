import { useAppSelector } from "../../redux/hooks";
import CartProductList from "../CartProductList/CartProductList";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import TotalPrice from "../TotalPrcie/TotalPrice";

import "./Checkout.scss";

const Checkout = () => {
  const cartProducts = useAppSelector((state) => state.cart.cartItems);
  return (
    <div className="checkout">
      <div className="checkout__container _container">
        <h2>Products to buy</h2>
        <CartProductList cartProducts={cartProducts} />
        <TotalPrice cartProducts={cartProducts} />
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Checkout;
