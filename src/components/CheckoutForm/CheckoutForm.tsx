import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { ICheckout, ICustomerFormData } from "../../types/checkout.types";
import { useAddNewCheckoutMutation } from "../../redux/Slices/api/checkoutApiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { total } from "../../utils/utils";
import { clearCart } from "../../redux/Slices/CartSlice";
import CheckoutFormInput from "../CheckoutFormInput/CheckoutFormInput";

import "./CheckoutForm.scss";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [addCheckout, { error, data }] = useAddNewCheckoutMutation();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const userId = useAppSelector((state) => state.auth.userInfo?.user._id);

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ICustomerFormData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      surname: "",
      phone: 0,
      address: {
        country: "",
        city: "",
        street: "",
        postIndex: 0,
      },
    },
  });

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        console.log(error.data);
      }
    }
    if (data) {
      console.log(data);
    }
  }, [error, data]);

  const onSubmit: SubmitHandler<ICustomerFormData> = (formData) => {
    const totalPrice = total(cartItems);
    const newCheckout: ICheckout = {
      customerData: {
        ...formData,
      },
      totalPrice,
      customerID: userId as string,
      products: cartItems,
    };
    addCheckout(newCheckout);
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <div className="checkoutForm">
      <div className="checkoutForm__container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CheckoutFormInput
            name="Name"
            type="text"
            register={register}
            errors={errors}
            formFieldName="name"
            minLength={{
              value: 4,
              message: "Name must be longer than 5 characters",
            }}
            maxLength={{
              value: 15,
              message: "Name must be less than 16 characters",
            }}
          />
          <CheckoutFormInput
            name="Surname"
            type="text"
            register={register}
            errors={errors}
            formFieldName="surname"
            minLength={{
              value: 4,
              message: "Surname must be longer than 5 characters",
            }}
            maxLength={{
              value: 15,
              message: "Surname must be less than 16 characters",
            }}
          />
          <CheckoutFormInput
            name="Phone"
            type="text"
            register={register}
            errors={errors}
            formFieldName="phone"
            minLength={{
              value: 10,
              message: "Phone must contain 10 number",
            }}
            maxLength={{
              value: 10,
              message: "Phone must contain less than 11 number",
            }}
          />
          <h2 className="checkoutForm__address">Address</h2>
          <section className="checkoutForm__address_Section">
            <CheckoutFormInput
              name="Country"
              type="text"
              register={register}
              errors={errors}
              formFieldName="address.country"
              minLength={{
                value: 4,
                message: "Country name must contain more than 4 characters",
              }}
              maxLength={{
                value: 20,
                message: "Country name must contain less than 21 characters",
              }}
            />
            <CheckoutFormInput
              name="City"
              type="text"
              register={register}
              errors={errors}
              formFieldName="address.city"
              minLength={{
                value: 4,
                message: "City name must contain more than 4 characters",
              }}
              maxLength={{
                value: 20,
                message: "City name must contain less than 21 characters",
              }}
            />
            <CheckoutFormInput
              name="Street"
              type="text"
              register={register}
              errors={errors}
              formFieldName="address.street"
              minLength={{
                value: 4,
                message: "Street name must contain more than 4 characters",
              }}
              maxLength={{
                value: 20,
                message: "Street name must contain less than 21 characters",
              }}
            />
            <CheckoutFormInput
              name="Post Index"
              type="number"
              register={register}
              errors={errors}
              formFieldName="address.postIndex"
              minLength={{
                value: 4,
                message: "Post Index must contain 4 numbers",
              }}
              maxLength={{
                value: 8,
                message: "Post Index must contain less than 9 numbers",
              }}
            />
          </section>
          <input
            className={!isValid ? "submit-button disabled" : "submit-button"}
            type="submit"
            disabled={!isValid}
          />
          <button
            onClick={() => navigate("/")}
            className="go-back checkout-back-button"
          >
            Go back
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
