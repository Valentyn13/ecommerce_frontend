import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Preloader from "../Preloader/Preloader";
import LaptopSlider from "../LaptopSlider/LaptopSlider";
import { useLazyFetchLaptopByIdQuery } from "../../redux/Slices/api/laptopApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  isInCartExist,
  isInFovouritesExist,
  isInCompareExist,
} from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeItem, addItem } from "../../redux/Slices/CartSlice";
import { ILaptop } from "../../types/laptop.types";
import {
  removeFavourite,
  addFavourite,
  addItemToCompare,
  removeItemFromCompateList,
} from "../../redux/Slices/comprasionAndFavouriteSlice";

import {
  AiOutlineHeart as HeartButton,
  AiFillHeart as FilledHeart,
} from "react-icons/ai";
import { LiaBalanceScaleSolid as Weights } from "react-icons/lia";

import "react-toastify/ReactToastify.min.css";
import "./../LaptopModal/LaptopModal.scss";

const LaptopPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [getLaptopById, { data, error, isSuccess, isLoading }] =
    useLazyFetchLaptopByIdQuery();

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
    if (data) {
      setIsInCart(isInCartExist(cartItems, data._id)());
      setIsInFavourites(isInFovouritesExist(favourites, data._id)());
      setIsInCompare(isInCompareExist(compareList, data._id)());
    }
  }, [data, cartItems, favourites, compareList]);

  useEffect(() => {
    if (id) {
      getLaptopById(id);
    }
    if (error) {
      if ("data" in error) {
        toast.error(JSON.stringify(error.data), {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [error, getLaptopById, id]);

  return (
    <div className="laptopModal">
      <ToastContainer />
      {isLoading && <Preloader />}
      {data && isSuccess && (
        <div className="laptopModal__container _container">
          <div className="laptopModal__headerSection">
            <LaptopSlider id={data._id} />
            <div className="laptopModal__mainInfo">
              <div className="laptopModal__InfoBlock">
                <div className="laptopModal__name">{data.name}</div>
                <div className="laptopModal__producer">
                  Producer:{data.producer}
                </div>
                <div className="laptopModal__price">Price: {data.price} ₴</div>
              </div>
              <div className="laptopModal__controllers">
                <div>
                  <button className="go-back" onClick={() => navigate("/")}>
                    Go back
                  </button>
                  {isInCart ? (
                    <button
                      style={{ backgroundColor: "lightyellow" }}
                      onClick={() =>
                        isInCartController(isInCart, data._id, data)
                      }
                      className="add-to-cart"
                    >
                      Remove from cart
                    </button>
                  ) : (
                    <button
                      className="add-to-cart"
                      onClick={() =>
                        isInCartController(isInCart, data._id, data)
                      }
                    >
                      Add to cart +
                    </button>
                  )}
                </div>
                <div className="hw-icons">
                  {isInFavourites ? (
                    <div
                      onClick={() =>
                        isInFavouritesController(isInFavourites, data._id, data)
                      }
                    >
                      <FilledHeart style={{ color: "red" }} />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        isInFavouritesController(isInFavourites, data._id, data)
                      }
                    >
                      <HeartButton />
                    </div>
                  )}
                  {isInCompare ? (
                    <div
                      onClick={() =>
                        isInCompareController(isInCompare, data._id, data)
                      }
                      className="isCompared"
                    >
                      <Weights style={{ color: "green" }} />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        isInCompareController(isInCompare, data._id, data)
                      }
                    >
                      <Weights />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="laptopModal__mainSection mainSection">
            <div className="mainSection__screen mainSection__block">
              <h2>Screen</h2>
              <div className="mainSection__screen-size mainSection__element">
                <div>
                  <p>Screen size</p>
                  <div></div>
                </div>
                {data.screen.size}
              </div>
              <div className="mainSection__screen-matrice mainSection__element">
                <div>
                  Screen matrice type<div></div>
                </div>
                {data.screen.screenType}
              </div>
              <div className="mainSection__screen-resolution mainSection__element">
                <div>
                  Screen resolution<div></div>
                </div>
                {data.screen.resolution}
              </div>
            </div>
            <div className="mainSection__cpu mainSection__block">
              <h2>CPU</h2>
              <div className="mainSection__cpu-producer mainSection__element">
                <div>
                  CPU producer<div></div>
                </div>
                {data.CPU.producer}
              </div>
              <div className="mainSection__cpu-model mainSection__element">
                <div>
                  CPU model<div></div>
                </div>
                {data.CPU.model}
              </div>
              <div className="mainSection__cpu-cores mainSection__element">
                <div>
                  Cores<div></div>
                </div>
                {data.CPU.cores}
              </div>
            </div>
            <div className="mainSection__hardDrive mainSection__block">
              <h2>Hard disk</h2>
              <div className="mainSection__hardDrive-type mainSection__element">
                <div>
                  Hard disk type<div></div>
                </div>
                {data.hardDrive.hardType}
              </div>
              <div className="mainSection__hardDrive-value mainSection__element">
                <div>
                  Hard disk size<div></div>
                </div>
                {data.hardDrive.value}
              </div>
            </div>
            <div className="mainSection__videoCard mainSection__block">
              <h2>Video card</h2>
              <div className="mainSection__videoCard-producer mainSection__element">
                <div>
                  Video card producer<div></div>
                </div>
                {data.videoCard.producer}
              </div>
              <div className="mainSection__videoCard-model mainSection__element">
                <div>
                  Video card model<div></div>
                </div>
                {data.videoCard.model}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaptopPage;
