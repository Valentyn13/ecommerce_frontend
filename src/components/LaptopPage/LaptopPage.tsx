import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Preloader from "../Preloader/Preloader";
import LaptopSlider from "../LaptopSlider/LaptopSlider";
import {
  useDeleteLaptopMutation,
  useEditLaptopMutation,
  useLazyFetchLaptopByIdQuery,
} from "../../redux/Slices/api/laptopApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  isInCartExist,
  isInFovouritesExist,
  isInCompareExist,
} from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeItem, addItem } from "../../redux/Slices/CartSlice";
import { ILaptop, ILaptopFormData } from "../../types/laptop.types";
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
import { useDeleteSliderImagesMutation } from "../../redux/Slices/api/sliderImagesApiSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

const LaptopPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [getLaptopById, { data, error, isLoading }] =
    useLazyFetchLaptopByIdQuery();

  const [editLaptop, { isSuccess }] = useEditLaptopMutation();
  const [deleteLaptop] = useDeleteLaptopMutation();
  const [deleteSLiderImages] = useDeleteSliderImagesMutation();

  const [isInCart, setIsInCart] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [isInFavourites, setIsInFavourites] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);

  const user = useAppSelector((state) => state.auth.userInfo);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const favourites = useAppSelector(
    (state) => state.compareAndFavourite.favourite
  );
  const compareList = useAppSelector(
    (state) => state.compareAndFavourite.compare
  );

  const {
    register,
    formState: { isValid, errors },
    reset,
    handleSubmit,
  } = useForm<ILaptopFormData>({
    mode: "onBlur",
    defaultValues: {
      name: data?.name,
      price: data?.price,
      producer: data?.producer,
      screen: {
        size: data?.screen.size,
        screenType: data?.screen.screenType,
        resolution: data?.screen.resolution,
      },
      CPU: {
        producer: data?.CPU.producer,
        model: data?.CPU.model,
        cores: data?.CPU.cores,
      },
      videoCard: {
        producer: data?.videoCard.producer,
        model: data?.videoCard.model,
      },
      hardDrive: {
        value: data?.hardDrive.value,
        hardType: data?.hardDrive.hardType,
      },
    },
  });

  const handleDeleteLaptop = (id: string) => {
    deleteLaptop(id);
    deleteSLiderImages(id);
    navigate("/");
  };

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

  const handleEditChangesSubmit: SubmitHandler<ILaptopFormData> = (laptop) => {
    try {
      console.log(data);
      setIsEditModeActive(false);
      const id = data?._id as string;
      editLaptop({ id, payload: laptop });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setIsInCart(isInCartExist(cartItems, data._id)());
      setIsInFavourites(isInFovouritesExist(favourites, data._id)());
      setIsInCompare(isInCompareExist(compareList, data._id)());
    }
  }, [data, cartItems, favourites, compareList]);
  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        price: data.price,
        producer: data.producer,
        screen: {
          size: data.screen.size,
          screenType: data.screen.screenType,
          resolution: data.screen.resolution,
        },
        CPU: {
          producer: data.CPU.producer,
          model: data.CPU.model,
          cores: data.CPU.cores,
        },
        videoCard: {
          producer: data.videoCard.producer,
          model: data.videoCard.model,
        },
        hardDrive: {
          value: data.hardDrive.value,
          hardType: data.hardDrive.hardType,
        },
      });
    }
  }, [data, reset]);
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
  }, [error, getLaptopById, id, isSuccess]);

  return (
    <div className="laptopModal">
      <ToastContainer />
      {isLoading && <Preloader />}
      {data && (
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
                <div className="laptopModal__controllers-buttons">
                  <button className="go-back" onClick={() => navigate("/")}>
                    Go back
                  </button>
                  {isInCart ? (
                    <button
                      style={{ backgroundColor: "lightgreen" }}
                      onClick={() =>
                        isInCartController(isInCart, data._id, data)
                      }
                      className="add-to-cart"
                    >
                      Delete from cart
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
                  {user && user.user.role === "ADMIN" && isEditModeActive ? (
                    <button
                      style={{
                        backgroundColor: isValid ? "yellow" : "lightgray",
                        cursor: isValid ? "pointer" : "not-allowed",
                      }}
                      disabled={!isValid}
                      onClick={handleSubmit(handleEditChangesSubmit)}
                    >
                      Save changes
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditModeActive(true)}
                      style={{ backgroundColor: "orange" }}
                    >
                      Edit laptop
                    </button>
                  )}
                  {user && user.user.role === "ADMIN" && (
                    <button
                      onClick={() => handleDeleteLaptop(data._id)}
                      style={{ backgroundColor: "red" }}
                    >
                      Delete laptop
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
            <form>
              <div className="mainSection__screen mainSection__block">
                <h2>Screen</h2>
                <div className="mainSection__screen-size mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>Screen size</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.screen.size}</p>
                  ) : (
                    <FormInput
                      register={register}
                      inputType="option"
                      formFieldName="screen.size"
                      optionValues={["13", "14", "15.6", "16", "17"]}
                      errors={errors}
                    />
                  )}
                </div>
                <div className="mainSection__screen-matrice mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>Screen matrice type</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.screen.screenType}</p>
                  ) : (
                    <FormInput
                      register={register}
                      inputType="option"
                      formFieldName="screen.screenType"
                      optionValues={["OLED", "IPS"]}
                      errors={errors}
                    />
                  )}
                </div>
                <div className="mainSection__screen-resolution mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>Screen resolution</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.screen.resolution}</p>
                  ) : (
                    <FormInput
                      register={register}
                      inputType="text"
                      formFieldName="screen.resolution"
                      minLength={{
                        value: 9,
                        message:
                          "Min length 9. Must be like: 1920x1200 Full HD",
                      }}
                      errors={errors}
                    />
                  )}
                </div>
              </div>
              <div className="mainSection__cpu mainSection__block">
                <h2>CPU</h2>
                <div className="mainSection__cpu-producer mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>CPU producer</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.CPU.producer}</p>
                  ) : (
                    <FormInput
                      register={register}
                      inputType="option"
                      formFieldName="CPU.producer"
                      errors={errors}
                      optionValues={["Intel", "AMD", "Apple", "Nvidia"]}
                    />
                  )}
                </div>
                <div className="mainSection__cpu-model mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>CPU model</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.CPU.model}</p>
                  ) : (
                    <FormInput
                      register={register}
                      inputType="text"
                      formFieldName="CPU.model"
                      minLength={{
                        value: 9,
                        message: "Min length 9. Must be like: Core i5-1135G7",
                      }}
                      errors={errors}
                    />
                  )}
                </div>
                <div className="mainSection__cpu-cores mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>Cores</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.CPU.cores}</p>
                  ) : (
                    <FormInput
                      register={register}
                      inputType="number"
                      formFieldName="CPU.cores"
                      errors={errors}
                    />
                  )}
                </div>
              </div>
              <div className="mainSection__hardDrive mainSection__block">
                <h2>Hard disk</h2>
                <div className="mainSection__hardDrive-type mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>Hard disk type</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.hardDrive.hardType}</p>
                  ) : (
                    <FormInput
                      register={register}
                      inputType="option"
                      formFieldName="hardDrive.hardType"
                      errors={errors}
                      optionValues={["SSD", "HDD"]}
                    />
                  )}
                </div>
                <div className="mainSection__hardDrive-value mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>Hard disk size</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.hardDrive.value}</p>
                  ) : (
                    <FormInput
                      register={register}
                      inputType="option"
                      formFieldName="hardDrive.value"
                      optionValues={["256", "512", "1024"]}
                      errors={errors}
                    />
                  )}
                </div>
              </div>
              <div className="mainSection__videoCard mainSection__block">
                <h2>Video card</h2>
                <div className="mainSection__videoCard-producer mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>Video card producer</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.videoCard.producer}</p>
                  ) : (
                    <FormInput
                      name="Producer"
                      register={register}
                      inputType="option"
                      formFieldName="videoCard.producer"
                      errors={errors}
                      optionValues={["Intel", "AMD", "Apple", "Nvidia"]}
                    />
                  )}
                </div>
                <div className="mainSection__videoCard-model mainSection__element">
                  <div className="mainSection__element_controller">
                    <p>Video card model</p>
                    <div></div>
                  </div>
                  {!isEditModeActive ? (
                    <p>{data.videoCard.model}</p>
                  ) : (
                    <FormInput
                      name="Model"
                      register={register}
                      inputType="text"
                      formFieldName="videoCard.model"
                      minLength={{
                        value: 9,
                        message: "Min length 9. Must be like: Iris Xe Graphics",
                      }}
                      errors={errors}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaptopPage;
