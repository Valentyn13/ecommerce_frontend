import { useForm } from "react-hook-form";
import { ChangeEvent, ReactNode, useState } from "react";

import { useAddLaptopMutation } from "../../redux/Slices/api/laptopApiSlice";
import { Link } from "react-router-dom";
import { useAddSliderImagesMutation } from "../../redux/Slices/api/sliderImagesApiSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.min.css'
import "./Admin.scss";

export const Admin = () => {
  const [base64Images, setBase64Images] = useState<string>("");

  const [sliderImages] = useState<(string | undefined)[]>([])
  
  const enum REDUCER_ACTION_TYPES {
    ADD_FIRST_IMAGE,
    ADD_SECOND_IMAGE,
    ADD_THIRD_IMAGE,
    ADD_FORTH_IMAGE
  }

  type ReducerAction = {
    type:REDUCER_ACTION_TYPES;
  }

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      price: 0,
      producer: "",
      screen: {
        size: 0,
        screenType: "",
        resolution: "",
      },
      CPU: {
        producer: "",
        model: "",
        cores: 0,
      },
      videoCard: {
        producer: "",
        model: "",
      },
      hardDrive: {
        value: 0,
        hardType: "",
      },
    },
  });

  const [addLaptop] = useAddLaptopMutation();
  const [addImages] = useAddSliderImagesMutation()

  const convertToBase64 = (file:Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.id === "main_image") {
        const file = e.target.files[0];
        const base64 = (await convertToBase64(file)) as string;
        sliderImages[0]=base64
        setBase64Images(base64);

      } else {
        const file = e.target.files[0];
        const base64 = (await convertToBase64(file)) as string;
        return base64
      }
    }
  };


  const reducer = async(action:ReducerAction, e:ChangeEvent<HTMLInputElement>) => {
    const converImage = await handleFileUpload(e)
    switch (action.type) {
      case REDUCER_ACTION_TYPES.ADD_FIRST_IMAGE:
        sliderImages[1] = converImage
        console.log(sliderImages)
        return 
      case REDUCER_ACTION_TYPES.ADD_SECOND_IMAGE:
        sliderImages[2] = converImage
        console.log(sliderImages)
      return 

      case REDUCER_ACTION_TYPES.ADD_THIRD_IMAGE:
        sliderImages[3] = converImage
        console.log(sliderImages)
      return
    
      default:
        console.log('reducer unexpected action type')
        break;
    }
  }


  const onSubmit = async (data: any) => {
    try {
      if (base64Images === "") return console.log("No file");

      const laptop = {
        ...data,
      };
      laptop.mainImage = base64Images;
      const res = await addLaptop(laptop).unwrap();
      console.log("laptop added");
      const imagesData = {
        laptopId:res._id,
        images: sliderImages
      }
      const images = addImages(imagesData).unwrap()
      console.log({
        res, images
      })
    } catch (error) {
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
  };

  return (
    <div className="admin">
      <ToastContainer/>
      <div className="admin__container _container">
        <div className="admin__add_section add_section">
          <h2 className="add_section__header">Add new laptop</h2>
          <button className="add_section__button">
            <Link to="/">Home</Link>
          </button>
          <button className="add_section__button">
            <Link to="/profile">Profile</Link>
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="add_section__container">
              <div className="add_section__area " id="image">
                <h4 className="add_section__label">Laptop images</h4>
                <div className="add_section__area-images">
                <div>
                  <h2>Choose laptop preview image</h2>
                  <input
                    className="file-input"
                    type="file"
                    id="main_image"
                    accept=".jpeg, .png, .jpg .webp"
                    onChange={handleFileUpload}
                  />
                </div>
                <div>
                  <h2>Choose first slider image</h2>
                  <input
                    className="file-input"
                    type="file"
                    accept=".jpeg, .png, .jpg .webp"
                    onChange={(e) => reducer({type:REDUCER_ACTION_TYPES.ADD_FIRST_IMAGE}, e)}
                  />
                </div>

                <div>
                  <h2>Choose second slider image</h2>
                  <input
                    className="file-input"
                    type="file"
                    accept=".jpeg, .png, .jpg .webp"
                    onChange={(e) => reducer({type:REDUCER_ACTION_TYPES.ADD_SECOND_IMAGE},e)}
                  />
                </div>
                <div>
                  <h2>Choose third slider image</h2>
                  <input
                    className="file-input"
                    type="file"
                    accept=".jpeg, .png, .jpg .webp"
                    onChange={(e) => reducer({type:REDUCER_ACTION_TYPES.ADD_THIRD_IMAGE},e)}
                  />
                </div>
                </div>
              </div>
              <div className="add_section__area" id="info">
                <h4 className="add_section__label">Laptop info</h4>
                <div className="add_section__content">
                  <div className="add_section__inputs inputs">
                    <div className="inputs__container">
                      <label>
                        <p>Name</p>
                        <input
                          type="text"
                          {...register("name", {
                            required: "Field is required",
                            minLength: {
                              value: 5,
                              message: "Must be more than 5 characters",
                            },
                          })}
                        />
                        {errors?.name && (
                          <div className="input_error">
                            {errors.name.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="inputs__container">
                      <label>
                        <p>Price</p>
                        <input
                          {...register("price", {
                            required: "Field is required",
                          })}
                          type="number"
                        />
                        {errors?.price && (
                          <div className="input_error">
                            {errors.price.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="inputs__container">
                      <label>
                        <p>Producer</p>
                        <input
                          type="text"
                          {...register("producer", {
                            required: "Field is required",
                            minLength: {
                              value: 3,
                              message: "Must be more than 5 characters",
                            },
                          })}
                        />
                        {errors?.producer && (
                          <div className="input_error">
                            {errors.producer.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add_section__area" id="screen">
                <h4 className="add_section__label">Screen</h4>
                <div className="add_section__content">
                  <div className="add_section__inputs inputs">
                    <div className="inputs__container">
                      <label>
                        <p>Size</p>
                        <input
                          type="number"
                          {...register("screen.size", {
                            required: "Field is required",
                          })}
                        />
                        {errors?.screen?.size && (
                          <div className="input_error">
                            {errors.screen?.size.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="inputs__container">
                      <label>
                        <p>Screen Type</p>
                        <select
                          id=""
                          defaultValue=""
                          {...register("screen.screenType", {
                            required: "Field is required",
                          })}
                        >
                          <option value="" disabled>
                            Select type:
                          </option>
                          <option value="IPS">IPS</option>
                          <option value="OLED">OLED</option>
                        </select>
                        {errors?.screen?.screenType && (
                          <div className="input_error">
                            {errors.screen?.screenType.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="inputs__container">
                      <label>
                        <p>Resolution</p>
                        <input
                          type="text"
                          {...register("screen.resolution", {
                            required: "Field is required",
                            minLength: {
                              value: 9,
                              message: "Must be like: 1920x1200 Full HD",
                            },
                          })}
                        />
                        {errors?.screen?.resolution && (
                          <div className="input_error">
                            {errors.screen?.resolution.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add_section__area" id="cpu">
                <h4 className="add_section__label">CPU</h4>
                <div className="add_section__content">
                  <div className="add_section__inputs inputs">
                    <div className="inputs__container">
                      <label>
                        <p>Producer</p>
                        <select
                          id="cpu-producer"
                          defaultValue=""
                          {...register("CPU.producer", {
                            required: "Field is required",
                          })}
                        >
                          <option value="" disabled>
                            Select company:
                          </option>
                          <option value="Intel">Intel</option>
                          <option value="AMD">AMD</option>
                          <option value="Apple">Apple</option>
                        </select>
                        {errors?.CPU?.producer && (
                          <div className="input_error">
                            {errors.CPU?.producer.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="inputs__container">
                      <label>
                        <p>Model</p>
                        <input
                          type="text"
                          {...register("CPU.model", {
                            required: "Field is required",
                            minLength: {
                              value: 9,
                              message: "Must be like: Core i5-1135G7 ",
                            },
                          })}
                        />
                        {errors?.CPU?.model && (
                          <div className="input_error">
                            {errors.CPU?.model.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="inputs__container">
                      <label>
                        <p>Cores</p>
                        <input
                          type="number"
                          {...register("CPU.cores", {
                            required: "Field is required",
                          })}
                        />
                        {errors?.CPU?.cores && (
                          <div className="input_error">
                            {errors.CPU?.cores.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add_section__area" id="videoCard">
                <h4 className="add_section__label">Video Card</h4>
                <div className="add_section__content">
                  <div className="add_section__inputs inputs">
                    <div className="inputs__container">
                      <label>
                        <p>Producer</p>
                        <select
                          defaultValue=""
                          id="videocard-producer"
                          {...register("videoCard.producer", {
                            required: "Field is required",
                          })}
                        >
                          <option value="" disabled>
                            Select company:
                          </option>
                          <option value="Intel">Intel</option>
                          <option value="AMD">AMD</option>
                        </select>
                        {errors?.videoCard?.producer && (
                          <div className="input_error">
                            {errors.videoCard?.producer.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="inputs__container">
                      <label>
                        <p>Model</p>
                        <input
                          type="text"
                          {...register("videoCard.model", {
                            required: "Field is required",
                            minLength: {
                              value: 9,
                              message: "Must be like: Iris Xe Graphics",
                            },
                          })}
                        />
                        {errors?.videoCard?.model && (
                          <div className="input_error">
                            {errors.videoCard?.model.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add_section__area" id="hardDrive">
                <h4 className="add_section__label">Hard Drive</h4>
                <div className="add_section__content">
                  <div className="add_section__inputs inputs">
                    <div className="inputs__container">
                      <label>
                        <p>Value</p>
                        <input
                          type="number"
                          {...register("hardDrive.value", {
                            required: "Field is required",
                          })}
                        />
                        {errors?.hardDrive?.value && (
                          <div className="input_error">
                            {errors.hardDrive?.value.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="inputs__container">
                      <label>
                        <p>Type</p>
                        <select
                          id="hardType"
                          defaultValue=""
                          {...register("hardDrive.hardType", {
                            required: "Field is required",
                          })}
                        >
                          <option value="" disabled>
                            Select type:
                          </option>
                          <option value="SSD">SSD</option>
                          <option value="HDD">HDD</option>
                        </select>
                        {errors?.hardDrive?.hardType && (
                          <div className="input_error">
                            {errors.hardDrive?.hardType.message as ReactNode}
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input type="submit" disabled={!isValid} />
          </form>
        </div>
      </div>
    </div>
  );
};
