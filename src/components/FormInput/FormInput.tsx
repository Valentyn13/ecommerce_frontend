import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { ILaptopFormData } from "../../types/laptop.types";
import { IFormLength } from "../../types/checkout.types";
import { ErrorMessage } from "@hookform/error-message";

interface IFormInputProps {
  name: string;
  inputType: "text" | "number" | "file" | "option";
  errors: FieldErrors<ILaptopFormData>;
  register: UseFormRegister<ILaptopFormData>;
  formFieldName:
    | "name"
    | "price"
    | "producer"
    | "mainImage"
    | "screen"
    | "CPU"
    | "videoCard"
    | "hardDrive"
    | "screen.size"
    | "screen.screenType"
    | "screen.resolution"
    | "CPU.producer"
    | "CPU.model"
    | "CPU.cores"
    | "videoCard.producer"
    | "videoCard.model"
    | "hardDrive.value"
    | "hardDrive.hardType";
  minLength?: IFormLength;
  optionValues?: string[];
}
const FormInput: FC<IFormInputProps> = ({
  name,
  inputType,
  errors,
  register,
  formFieldName,
  minLength,
  optionValues,
}) => {
  return (
    <div className="inputs__container">
      <label>
        <p>{name}</p>
        {inputType === "option" ? (
          <select
            id=""
            defaultValue=""
            {...register(formFieldName, {
              required: "Field is required",
            })}
          >
            <option value="" disabled>
              Select {name.toLocaleLowerCase()}
            </option>
            {optionValues?.map((option) => (
              <option key={uuidv4()} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={inputType}
            {...register(formFieldName, {
              required: "Field is required",
              minLength,
            })}
          />
        )}
        <ErrorMessage
          errors={errors}
          name={formFieldName}
          render={({ message }) => <div className="input_error">{message}</div>}
        />
      </label>
    </div>
  );
};

export default FormInput;
