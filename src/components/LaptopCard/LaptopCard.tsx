import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addItem, removeItem } from "../../redux/Slices/CartSlice";
import { ILaptop } from "../../types/laptop.types";
import { isInCartExist, isInCompareExist, isInFovouritesExist, truncate } from "../../utils/utils";
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
  const navigate = useNavigate()
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const favourites = useAppSelector(
    (state) => state.compareAndFavourite.favourite
  );
  const compareList = useAppSelector(
    (state) => state.compareAndFavourite.compare
  );

  const [isElementInCart, setIsElementInCart] = useState<boolean>(false);

  const [isElementInFavourite, setIsElementInFavourite] = useState(false);
  const [isElementCompared, setIsElementCompared] = useState(false);



  const isInCartController = () => {
    if (isElementInCart) {
      setIsElementInCart(false);
      dispatch(removeItem(laptopProps._id));
      return;
    }
    setIsElementInCart(true);
    dispatch(addItem({ amount: 1, product: laptopProps }));
  };

  const favouriteController = () => {
    if (isElementInFavourite) {
      setIsElementInFavourite(false);
      dispatch(removeFavourite(laptopProps._id));
      return;
    }
    setIsElementInFavourite(true);
    dispatch(addFavourite(laptopProps));
  };

  const compareController = () => {
    if (isElementCompared) {
      setIsElementCompared(false);
      dispatch(removeItemFromCompateList(laptopProps._id));
      return;
    }
    if (compareList.length < 2) {
      setIsElementCompared(true);
      dispatch(addItemToCompare(laptopProps));
      return;
    }
  };

  // CHECKER
  const cartChecker = useCallback(() => {
    const inCart = cartItems.find(
      (item) => item.product._id === laptopProps._id
    );
    const inFav = favourites.find((item) => item._id === laptopProps._id);
    const isCompared = compareList.find((item) => item._id === laptopProps._id);
    if (inFav) setIsElementInFavourite(true);
    if (isCompared) setIsElementCompared(true);
    if (inCart) setIsElementInCart(true);
  }, [cartItems, laptopProps._id, favourites, compareList]);

  useEffect(() => cartChecker(), [cartChecker]);

  return (
    <div className="laptop_card__wrapper">
      {isAction && <div className="action">Action</div>}
      {inSale && <div className="sale">Top in sale</div>}
      <div className="card-icons">
        <div onClick={favouriteController}>
          {isElementInFavourite && isInFovouritesExist(favourites ,laptopProps._id)() ? (
            <FilledHeart style={{ color: "red" }} />
          ) : (
            <HeartButton />
          )}
        </div>
        <div onClick={compareController}>
          {isElementCompared && isInCompareExist(compareList, laptopProps._id)() ? (
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
          <div className="laptop_card__cart" onClick={isInCartController}>
            {isElementInCart && isInCartExist(cartItems, laptopProps._id)() ? (
              <AlreadyInCart />
            ) : (
              <CartButton />
            )}
          </div>
        </div>
      </div>
      <div className="view-more">
        <button onClick={() =>navigate(`/laptop/${laptopProps._id}`)}>
          View details
        </button>
      </div>
    </div>
  );
};

export default LaptopCard;
