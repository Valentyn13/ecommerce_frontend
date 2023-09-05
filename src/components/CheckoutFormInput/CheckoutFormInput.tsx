import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { ICustomerFormData, IFormLength } from "../../types/checkout.types";
import { ErrorMessage } from "@hookform/error-message";

interface ICheckoutFormInput {
  name: string;
  register: UseFormRegister<ICustomerFormData>;
  errors: FieldErrors<ICustomerFormData>;
  formFieldName:
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
  formFieldName,
}) => {
  return (
    <div className="checkoutForm__filedWrapper">
      <label className="checkoutForm__label">
        <p className="checkoutForm__inputName">{name}:</p>
        <input
          type="text"
          className="checkoutForm__input"
          {...register(formFieldName, {
            required: `${name} is required`,
            minLength,
            maxLength,
          })}
        />
        <ErrorMessage
          errors={errors}
          name={formFieldName}
          render={({ message }) => <div className="input_error">{message}</div>}
        />
      </label>
    </div>
  );
};

export default CheckoutFormInput;
