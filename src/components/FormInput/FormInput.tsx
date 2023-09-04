import { FC, ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { ILaptopFormData } from "../../types/laptop.types";

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
  minLength?: {
    value: number;
    message: string;
  };
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
              required: 'Field is required',
            })}
          >
            <option value="" disabled>
              Select {name.toLocaleLowerCase()}
            </option>
            {optionValues?.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={inputType}
            {...register(formFieldName, {
              required: 'Field is required',
              minLength,
            })}
          />
        )}

        {errors?.name && (
          <div className="input_error">{errors.name.message as ReactNode}</div>
        )}
      </label>
    </div>
  );
};

export default FormInput;
