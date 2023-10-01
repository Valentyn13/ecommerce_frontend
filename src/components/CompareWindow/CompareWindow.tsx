import { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addItem, removeItem } from "../../redux/Slices/CartSlice";
import { isInCartExist } from "../../utils/utils";
import { removeItemFromCompateList } from "../../redux/Slices/comprasionAndFavouriteSlice";
import { ILaptop } from "../../types/laptop.types";

import "./CompareWindow.scss";

interface ICompareElementProps {
  element: ILaptop;
}

const CompareElement: FC<ICompareElementProps> = ({ element }) => {
  const dispatch = useAppDispatch();

  const cartElements = useAppSelector((state) => state.cart.cartItems);

  const [isInCart, setIsInCart] = useState(false);

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
  useEffect(() => {
    setIsInCart(isInCartExist(cartElements, element._id)());
  }, [element._id, isInCart, setIsInCart, cartElements]);

  return (
    <>
      <div className="compareElement">
        <div className="compareElement__image">
          <img src={element.mainImage} alt="Compare Item Main Image" />
        </div>
        <div className="mainSection">
          <div className="mainSection__screen mainSection__block">
            <h2>Screen</h2>
            <div className="mainSection__screen-size mainSection__element">
              <div>
                <p>Screen size</p>
                <div></div>
              </div>
              {element.screen.size}
            </div>
            <div className="mainSection__screen-matrice mainSection__element">
              <div>
                Screen matrice type<div></div>
              </div>
              {element.screen.screenType}
            </div>
            <div className="mainSection__screen-resolution mainSection__element">
              <div>
                Screen resolution<div></div>
              </div>
              {element.screen.resolution}
            </div>
          </div>
          <div className="mainSection__cpu mainSection__block">
            <h2>CPU</h2>
            <div className="mainSection__cpu-producer mainSection__element">
              <div>
                CPU producer<div></div>
              </div>
              {element.CPU.producer}
            </div>
            <div className="mainSection__cpu-model mainSection__element">
              <div>
                CPU model<div></div>
              </div>
              {element.CPU.model}
            </div>
            <div className="mainSection__cpu-cores mainSection__element">
              <div>
                Cores<div></div>
              </div>
              {element.CPU.cores}
            </div>
          </div>
          <div className="mainSection__hardDrive mainSection__block">
            <h2>Hard disk</h2>
            <div className="mainSection__hardDrive-type mainSection__element">
              <div>
                Hard disk type<div></div>
              </div>
              {element.hardDrive.hardType}
            </div>
            <div className="mainSection__hardDrive-value mainSection__element">
              <div>
                Hard disk size<div></div>
              </div>
              {element.hardDrive.value}
            </div>
          </div>
          <div className="mainSection__videoCard mainSection__block">
            <h2>Video card</h2>
            <div className="mainSection__videoCard-producer mainSection__element">
              <div>
                Video card producer<div></div>
              </div>
              {element.videoCard.producer}
            </div>
            <div className="mainSection__videoCard-model mainSection__element">
              <div>
                Video card model<div></div>
              </div>
              {element.videoCard.model}
            </div>
          </div>
          <button
            className="comp-remove-btn"
            onClick={() => dispatch(removeItemFromCompateList(element._id))}
          >
            Remove
          </button>
          {isInCart ? (
            <button
              style={{ backgroundColor: "lightyellow" }}
              onClick={() => isInCartController(isInCart, element._id, element)}
              className="add-to-cart"
            >
              Remove from cart
            </button>
          ) : (
            <button
              className="add-to-cart"
              onClick={() => isInCartController(isInCart, element._id, element)}
            >
              Add to cart +
            </button>
          )}
        </div>
      </div>
    </>
  );
};

interface ICompareWindowProps {
  compareItems: ILaptop[];
}

const CompareWindow: FC<ICompareWindowProps> = ({ compareItems }) => {
  return (
    <div className="compareWindow _container">
      {compareItems.map((item) => {
        return <CompareElement key={item._id} element={item} />;
      })}
            {compareItems.length === 0 && (<h2 className="compareWindow__warning">Please choose two products to compare</h2>)}
      {compareItems.length === 1 && (<h2 className="compareWindow__warning">Please pick up one more product</h2>)}
    </div>
  );
};

export default CompareWindow;
