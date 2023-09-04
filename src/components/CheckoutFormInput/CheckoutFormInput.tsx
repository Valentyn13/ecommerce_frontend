import { FC, ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { ICustomerFormData, IFormLength } from "../../types/checkout.types";

interface ICheckoutFormInput {
  name: string;
  register: UseFormRegister<ICustomerFormData>;
  errors: FieldErrors<ICustomerFormData>;
  formFiledName:
    | "name"
    | "surname"
    | "phone"
    | "address"
    | "address.country"
    | "address.city"
    | "address.street"
    | "address.postIndex";
  minLength: IFormLength;
  maxLength: IFormLength;
  type: "text" | "number";
}
const CheckoutFormInput: FC<ICheckoutFormInput> = ({
  register,
  errors,
  name,
  minLength,
  maxLength,
  formFiledName,
}) => {
  return (
    <div className="checkoutForm__filedWrapper">
      <label className="checkoutForm__label">
        <p className="checkoutForm__inputName">{name}:</p>
        <input
          type="text"
          className="checkoutForm__input"
          {...register(formFiledName, {
            required: `${name} is required`,
            minLength,
            maxLength,
          })}
        />
        {errors?.name && (
          <div className="input_error">{errors.name.message as ReactNode}</div>
        )}
      </label>
    </div>
  );
};

export default CheckoutFormInput;
