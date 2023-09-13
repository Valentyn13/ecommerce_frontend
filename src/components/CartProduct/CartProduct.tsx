import { FC } from "react";

import {
  removeItem,
  increaseAmount,
  decreaseAmount,
} from "../../redux/Slices/CartSlice";
import { ICartLaptop } from "../../types/cart.types";
import { useAppDispatch } from "../../redux/hooks";

interface ICartProductProps {
  product: ICartLaptop;
}
const CartProduct: FC<ICartProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="cartWindow__cartElement cartElement">
      <div className="cartElement__image">
        <img src={product.product.mainImage} alt="product image" />
      </div>
      <div className="cartElement__properties">
        <div className="cartElement__name">{product.product.name}</div>
        <p className="cartElement__price">{product.product.price} ₴ </p>
        <div className="cartElement__producer">{product.product.producer}</div>
        <div className="cartElement__options">
          <button onClick={() => dispatch(removeItem(product.product._id))}>
            Remove
          </button>
          <div className="cartElement__amount">
            <button
              onClick={() => dispatch(increaseAmount(product.product._id))}
            >
              +1
            </button>
            <button
              onClick={() => dispatch(decreaseAmount(product.product._id))}
            >
              -1
            </button>
          </div>
          <div>Amount: {product.amount}</div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
