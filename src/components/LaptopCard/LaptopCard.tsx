import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addItem, removeItem } from "../../redux/Slices/CartSlice";
import { ILaptop } from "../../types/laptop.types";
import {
  isInCartExist,
  isInCompareExist,
  isInFovouritesExist,
  truncate,
} from "../../utils/utils";
import {
  addFavourite,
  addItemToCompare,
  removeFavourite,
  removeItemFromCompateList,
} from "../../redux/Slices/comprasionAndFavouriteSlice";

import {
  AiOutlineHeart as HeartButton,
  AiFillCheckCircle as AlreadyInCart,
  AiOutlineShoppingCart as CartButton,
  AiFillHeart as FilledHeart,
} from "react-icons/ai";
import { LiaBalanceScaleSolid as Weights } from "react-icons/lia";

import "./LaptopCard.scss";

interface ILaptopCardProps {
  isAction?: boolean;
  inSale?: boolean;
  laptopProps: ILaptop;
}

const LaptopCard: FC<ILaptopCardProps> = ({
  laptopProps,
  isAction,
  inSale,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isInCart, setIsInCart] = useState(false);
  const [isInFavourites, setIsInFavourites] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const favourites = useAppSelector(
    (state) => state.compareAndFavourite.favourite
  );
  const compareList = useAppSelector(
    (state) => state.compareAndFavourite.compare
  );

  const isInCartController = (
    isExist: boolean,
    id: string,
    element: ILaptop
  ) => {
    if (isExist) {
      dispatch(removeItem(id));
      return;
    }
    dispatch(addItem({ amount: 1, product: element }));
  };

  const isInCompareController = (
    isExist: boolean,
    id: string,
    element: ILaptop
  ) => {
    if (isExist) {
      dispatch(removeItemFromCompateList(id));
      return;
    }
    dispatch(addItemToCompare(element));
  };

  const isInFavouritesController = (
    isExist: boolean,
    id: string,
    element: ILaptop
  ) => {
    if (isExist) {
      dispatch(removeFavourite(id));
      return;
    }
    dispatch(addFavourite(element));
  };

  useEffect(() => {
    setIsInCart(isInCartExist(cartItems, laptopProps._id)());
    setIsInFavourites(isInFovouritesExist(favourites, laptopProps._id)());
    setIsInCompare(isInCompareExist(compareList, laptopProps._id)());
  }, [cartItems, favourites, compareList, laptopProps]);

  return (
    <div className="laptop_card__wrapper">
      {isAction && <div className="action">Action</div>}
      {inSale && <div className="sale">Top in sale</div>}
      <div className="card-icons">
        <div           onClick={() =>
            isInFavouritesController(isInFavourites, laptopProps._id, laptopProps)
          }>
          {isInFavourites ? (
            <FilledHeart style={{ color: "red" }} />
          ) : (
            <HeartButton />
          )}
        </div>
        <div
          onClick={() =>
            isInCompareController(isInCompare, laptopProps._id, laptopProps)
          }
        >
          {isInCompare ? (
            <div className="isCompared" style={{ padding: "3px" }}>
              <Weights style={{ color: "green" }} />
            </div>
          ) : (
            <div style={{ padding: "3px" }}>
              <Weights />
            </div>
          )}
        </div>
      </div>
      <div className="laptop_card__img">
        <img src={laptopProps.mainImage} alt="laptop image" />
      </div>
      <div className="laptop_card__info">
        <div className="laptop_card__name">
          {truncate(laptopProps.name, 35)}
        </div>
        <div className="laptop_card__bottom">
          <p>
            {laptopProps.price} <span>₴</span>
          </p>
          <div
            className="laptop_card__cart"
            onClick={() =>
              isInCartController(isInCart, laptopProps._id, laptopProps)
            }
          >
            {isInCart ? <AlreadyInCart /> : <CartButton />}
          </div>
        </div>
      </div>
      <div className="view-more">
        <button onClick={() => navigate(`/laptop/${laptopProps._id}`)}>
          View details
        </button>
      </div>
    </div>
  );
};

export default LaptopCard;
