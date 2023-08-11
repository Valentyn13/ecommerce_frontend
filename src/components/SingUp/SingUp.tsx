import { useForm } from "react-hook-form";
import "./Login.scss";
import { ReactNode, Dispatch, FC } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/Slices/AuthSlice";
import { useRegisterMutation } from "../../redux/Slices/usersApiSlice";

interface ISingUpProps {
  active:boolean;
  setActive:Dispatch<React.SetStateAction<boolean>>
  children?: ReactNode
}
export const SingUp:FC<ISingUpProps> = ({active, setActive}) => {

  const dispatch = useAppDispatch()
  const [registerUser] = useRegisterMutation()
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser({
        role: 'USER',
        ...data
      }).unwrap()
      reset()
      setActive(false)
      dispatch(setCredentials({...res}))
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label>
              <div> Username</div>
              <input
                type="text"
                {...register("name", {
                  required: 'Field is required',
                  minLength:{value: 3, message: 'Username must be longer than 3 characters'}
                })}
              />
            </label>
            <div>{
            errors?.name && 
            <p style={{color:'red', marginTop: '4px'}}>{(errors.name.message) as ReactNode}</p>
            }</div>
          </div>
          <div className="input-container">
            <label>
              <div>Email</div>
              <input
                type="text"
                {...register("email", {
                    required: 'Field is required',
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Enter a valid email'
                    }
                })}
              />
            </label>
            <div>{
            errors?.email && 
            <p style={{color:'red', marginTop: '4px'}}>{(errors.email.message) as ReactNode}</p>
            }</div>
          </div>
          <div className="input-container input-container-last">
            <label>
              <div>Password</div>
              <input
                type="password"
                {...register("password", {
                    required: 'Field is required',
                    minLength:{value: 5, message: 'Password must be longer than 5 characters'}
                })}
              />
            </label>
            <div>{
            errors?.password && 
            <p style={{color:'red', marginTop: '4px'}}>{(errors.password.message) as ReactNode}</p>
            }</div>
          </div>
          <div className="submit-container">
            <input type="submit" disabled={!isValid} />
          </div>
        </form>
      </div>
    </div>
  );
};
