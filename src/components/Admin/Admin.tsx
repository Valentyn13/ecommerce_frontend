import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import "./Admin.scss";
import { useAddLaptopMutation } from "../../redux/Slices/laptopApiSlice";

export const Admin = () => {
  const [base64Images, setBase64Images] = useState<string>('a')
  const {
    register,
    formState: { errors, isValid },
    reset,
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

  const convertToBase64 = (file: any) => {
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
      if(e.target.id === 'main_image') {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file) as string
        console.log(base64Images)
        setBase64Images(base64)
        console.log(base64Images)
      }
    }
  };

  const onSubmit = async(data: any) => {
    try {
      if (base64Images === '') return console.log('No file')

      const laptop = {
        ...data,
      }
      laptop.mainImage = base64Images;
      const res = await addLaptop(laptop).unwrap()
      console.log('laptop added')
      console.log(res);
      
    } catch (error) { 
      console.log(error)
    }

  };

  return (
    <div className="admin">
      <div className="admin__container _container">
        <div className="admin__add_section add_section">
          <h2 className="add_section__header">Add new laptop</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="add_section__container">
              <div className="add_section__area" id="image">
                <h4 className="add_section__label">Laptop main image</h4>
                <input
                  type="file"
                  id="main_image"
                  accept=".jpeg, .png, .jpg"
                  onChange={handleFileUpload}
                />
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
