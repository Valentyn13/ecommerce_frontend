import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";

import { useAddLaptopMutation } from "../../redux/Slices/api/laptopApiSlice";
import { useAddSliderImagesMutation } from "../../redux/Slices/api/sliderImagesApiSlice";
import { ILaptopFormData } from "../../types/laptop.types";

import "react-toastify/ReactToastify.min.css";
import "./Admin.scss";
import FormInput from "../FormInput/FormInput";
import AdminFormArea from "../AdminFormArea/AdminFormArea";
import AddLaptopImageField from "../AddLaptopImageField/AddLaptopImageField";

const Admin = () => {
  const [addLaptop, { data, error }] = useAddLaptopMutation();
  const [addImages] = useAddSliderImagesMutation();

  const [sliderImages] = useState<string[]>([]);

  const enum REDUCER_ACTION_TYPES {
    ADD_FIRST_IMAGE,
    ADD_SECOND_IMAGE,
    ADD_THIRD_IMAGE,
    ADD_FORTH_IMAGE,
  }

  type ReducerAction = {
    type: REDUCER_ACTION_TYPES;
  };

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ILaptopFormData>({
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

  const convertToBase64 = (file: Blob) => {
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
      const file = e.target.files[0];
      const base64 = (await convertToBase64(file)) as string;
      sliderImages[0] = base64;
      return base64;
    }
    toast.error("e.target files[0] is undefined", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return "";
  };

  const reducer = async (
    action: ReducerAction,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const converImage = await handleFileUpload(e);
    switch (action.type) {
      case REDUCER_ACTION_TYPES.ADD_FIRST_IMAGE:
        sliderImages[0] = converImage;
        console.log(sliderImages);
        return;
      case REDUCER_ACTION_TYPES.ADD_SECOND_IMAGE:
        sliderImages[1] = converImage;
        console.log(sliderImages);
        return;
      case REDUCER_ACTION_TYPES.ADD_THIRD_IMAGE:
        sliderImages[2] = converImage;
        console.log(sliderImages);
        return;

      case REDUCER_ACTION_TYPES.ADD_FORTH_IMAGE:
        sliderImages[3] = converImage;
        console.log(sliderImages);
        return;

      default:
        console.log("reducer unexpected action type");
        break;
    }
  };

  const onSubmit: SubmitHandler<ILaptopFormData> = async (formData) => {
    if (!sliderImages[0]) {
      toast.error("Main image must be provided", {
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
    formData.mainImage = sliderImages[0];
    addLaptop(formData);
  };

  useEffect(() => {
    if (data) {
      if (
        sliderImages[0] &&
        sliderImages[1] &&
        sliderImages[2] &&
        sliderImages[3]
      ) {
        const imagesData = {
          laptopId: data._id,
          images: sliderImages,
        };
        addImages(imagesData);
        console.log("Laptop added");
      } else {
        toast.error("All slider images must be provided", {
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
  }, [data, addImages, sliderImages, error]);

  return (
    <div className="admin">
      <ToastContainer />
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
              <AdminFormArea areaName="Laptop images">
                <div className="add_section__area-images">
                  <AddLaptopImageField
                    text="Choose laptop preview image"
                    onChange={(e) =>
                      reducer({ type: REDUCER_ACTION_TYPES.ADD_FIRST_IMAGE }, e)
                    }
                  />
                  <AddLaptopImageField
                    text="Choose second slider image"
                    onChange={(e) =>
                      reducer({ type: REDUCER_ACTION_TYPES.ADD_SECOND_IMAGE }, e)
                    }
                  />
                  <AddLaptopImageField
                    text="Choose third slider image"
                    onChange={(e) =>
                      reducer({ type: REDUCER_ACTION_TYPES.ADD_THIRD_IMAGE }, e)
                    }
                  />
                  <AddLaptopImageField
                    text="Choose forth slider image"
                    onChange={(e) =>
                      reducer({ type: REDUCER_ACTION_TYPES.ADD_FORTH_IMAGE }, e)
                    }
                  />
                </div>
              </AdminFormArea>
              <AdminFormArea areaName="Laptop info">
                <FormInput
                  name="Name"
                  register={register}
                  inputType="text"
                  formFieldName="name"
                  minLength={{
                    value: 5,
                    message: '"Must be more than 5 characters"',
                  }}
                  errors={errors}
                />
                <FormInput
                  name="Price"
                  register={register}
                  inputType="number"
                  formFieldName="price"
                  errors={errors}
                />
                <FormInput
                  name="Producer"
                  register={register}
                  inputType="text"
                  formFieldName="producer"
                  minLength={{
                    value: 3,
                    message: "Must be more than 3 characters",
                  }}
                  errors={errors}
                />
              </AdminFormArea>
              <AdminFormArea areaName="Screen">
                <FormInput
                  name="Size"
                  register={register}
                  inputType="number"
                  formFieldName="screen.size"
                  errors={errors}
                />
                <FormInput
                  name="Screen Type"
                  register={register}
                  inputType="option"
                  formFieldName="screen.screenType"
                  errors={errors}
                  optionValues={["IPS", "OLED"]}
                />
                <FormInput
                  name="Resolution"
                  register={register}
                  inputType="text"
                  formFieldName="screen.resolution"
                  minLength={{
                    value: 9,
                    message: "Must be like: 1920x1200 Full HD",
                  }}
                  errors={errors}
                />
              </AdminFormArea>
              <AdminFormArea areaName="CPU">
                <FormInput
                  name="Producer"
                  register={register}
                  inputType="option"
                  formFieldName="CPU.producer"
                  errors={errors}
                  optionValues={["Intel", "AMD", "Apple"]}
                />
                <FormInput
                  name="Model"
                  register={register}
                  inputType="text"
                  formFieldName="CPU.model"
                  minLength={{
                    value: 9,
                    message: "Must be like: Core i5-1135G7",
                  }}
                  errors={errors}
                />
                <FormInput
                  name="Cores"
                  register={register}
                  inputType="number"
                  formFieldName="CPU.cores"
                  errors={errors}
                />
              </AdminFormArea>
              <AdminFormArea areaName="Video Card">
                <FormInput
                  name="Producer"
                  register={register}
                  inputType="option"
                  formFieldName="videoCard.producer"
                  errors={errors}
                  optionValues={["Intel", "AMD"]}
                />
                <FormInput
                  name="Model"
                  register={register}
                  inputType="text"
                  formFieldName="videoCard.model"
                  minLength={{
                    value: 9,
                    message: "Must be like: Iris Xe Graphics",
                  }}
                  errors={errors}
                />
              </AdminFormArea>
              <AdminFormArea areaName="Hard Drive">
                <FormInput
                  name="Value"
                  register={register}
                  inputType="number"
                  formFieldName="hardDrive.value"
                  errors={errors}
                />
                <FormInput
                  name="Type"
                  register={register}
                  inputType="option"
                  formFieldName="hardDrive.hardType"
                  errors={errors}
                  optionValues={["SSD", "HDD"]}
                />
              </AdminFormArea>
            </div>
            <input type="submit" disabled={!isValid} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
