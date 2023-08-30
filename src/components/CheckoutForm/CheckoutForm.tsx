import { SubmitHandler, useForm } from "react-hook-form";
import { ICustomerFormData } from "../../types/checkout.types";
import { ReactNode } from "react";

import './CheckoutForm.scss';

const CheckoutForm = () => {

    const {register, formState:{ isValid, errors}, handleSubmit} = useForm<ICustomerFormData>({
        mode: 'onBlur',
        defaultValues: {
            name:'',
            surname:'',
            phone: 0,
            address : {
                country: '',
                city: '',
                street: '',
                postIndex: 0,
            }
        }
    })

    const onSubmit:SubmitHandler<ICustomerFormData> = (formData) => {
        console.log(formData)
    }
  return (
    <div className="checkoutForm">
        <div className="checkoutForm__container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="checkoutForm__filedWrapper">
                    <label className="checkoutForm__label">
                        <p className="checkoutForm__inputName">Name:</p>
                        <input type="text"
                        className="checkoutForm__input"
                        {...register("name",{
                            required:"Name is required",
                            minLength: {
                                value: 4,
                                message: "Name must be longer than 5 characters"
                            },
                            maxLength: {
                                value: 15,
                                message: "Name must be less than 16 characters"
                            }
                        })}
                        />
                        {errors?.name && (
                          <div className="input_error">
                            {errors.name.message as ReactNode}
                          </div>
                        )}
                    </label>
                </div>
                <div className="checkoutForm__filedWrapper">
                    <label className="checkoutForm__label">
                        <p className="checkoutForm__inputName">Surname:</p>
                        <input className="checkoutForm__input" type="text"
                        {...register("surname",{
                            required:"Surname is required",
                            minLength: {
                                value: 4,
                                message: "Surname must be longer than 5 characters"
                            },
                            maxLength: {
                                value: 15,
                                message: "Surname must be less than 16 characters"
                            }
                        })}
                        />
                        {errors?.surname && (
                          <div className="input_error">
                            {errors.surname.message as ReactNode}
                          </div>
                        )}
                    </label>
                </div>
                <div className="checkoutForm__filedWrapper">
                    <label className="checkoutForm__label">
                        <p className="checkoutForm__inputName">Phone:</p>
                        <input className="checkoutForm__input" type="number"
                        {...register("phone",{
                            required:"Phone is required",
                            minLength: {
                                value: 10,
                                message: "Phone must contain 10 number"
                            },
                            maxLength: {
                                value: 10,
                                message: "Phone must contain less than 11 number"
                            }
                        })}
                        />
                        {errors?.phone && (
                          <div className="input_error">
                            {errors.phone.message as ReactNode}
                          </div>
                        )}
                    </label>
                </div>
                <h2 className="checkoutForm__address">Address</h2>
                <section className="checkoutForm__address_Section">
                    
                <div className="checkoutForm__filedWrapper">
                    <label className="checkoutForm__label">
                        <p className="checkoutForm__inputName">Country:</p>
                        <input className="checkoutForm__input" type="text"
                        {...register("address.country",{
                            required:"Country name is required",
                            minLength: {
                                value: 4,
                                message: "Country name must contain more than 4 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Country name must contain less than 21 characters"
                            }
                        })}
                        />
                        {errors?.address?.country && (
                          <div className="input_error">
                            {errors.address?.country.message as ReactNode}
                          </div>
                        )}
                    </label>
                </div>
                <div className="checkoutForm__filedWrapper">
                    <label className="checkoutForm__label">
                        <p className="checkoutForm__inputName">City:</p>
                        <input className="checkoutForm__input" type="text"
                        {...register("address.city",{
                            required:"City name is required",
                            minLength: {
                                value: 4,
                                message: "City name must contain more than 4 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "City name must contain less than 21 characters"
                            }
                        })}
                        />
                        {errors?.address?.city && (
                          <div className="input_error">
                            {errors.address?.city.message as ReactNode}
                          </div>
                        )}
                    </label>
                </div>
                <div className="checkoutForm__filedWrapper">
                    <label className="checkoutForm__label">
                        <p className="checkoutForm__inputName">Street:</p>
                        <input className="checkoutForm__input" type="text"
                        {...register("address.street",{
                            required:"Street name is required",
                            minLength: {
                                value: 4,
                                message: "Street name must contain more than 4 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Street name must contain less than 21 characters"
                            }
                        })}
                        />
                        {errors?.address?.street && (
                          <div className="input_error">
                            {errors.address?.street.message as ReactNode}
                          </div>
                        )}
                    </label>
                </div>
                <div className="checkoutForm__filedWrapper">
                    <label className="checkoutForm__label">
                        <p className="checkoutForm__inputName">Post Index:</p>
                        <input className="checkoutForm__input" type="number"
                        {...register("address.postIndex",{
                            required:"Street name is required",
                            minLength: {
                                value: 4,
                                message: "Post Index must contain 4 numbers"
                            },
                            maxLength: {
                                value: 8,
                                message: "Post Index must contain less than 9 numbers"
                            }
                        })}
                        />
                        {errors?.address?.postIndex && (
                          <div className="input_error">
                            {errors.address?.postIndex.message as ReactNode}
                          </div>
                        )}
                    </label>
                </div>
                </section>
                <input className={!isValid? "submit-button disabled": "submit-button"} type="submit" disabled={!isValid} />  
            </form>
        </div>
    </div>
  )
}

export default CheckoutForm;
