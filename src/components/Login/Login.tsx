import { useEffect,ReactNode, Dispatch, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/Slices/usersApiSlice";
import { setCredentials } from "../../redux/Slices/AuthSlice";

interface ILogInProps {
  active:boolean;
  setActive:Dispatch<React.SetStateAction<boolean>>
  children?: ReactNode
}

export const LogIn:FC<ILogInProps> = ({active, setActive}) => {

const navigate = useNavigate();
const dispatch = useAppDispatch();

const [login, {isLoading}] = useLoginMutation();

const { userInfo } = useAppSelector((state) => state.auth)

useEffect(() => {
  if (userInfo) {
    console.log('Userinfo => passed!')
  }
},[userInfo]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm(
    {
      mode: 'onBlur'
    }
  );

  const onSubmit = async (data: any) => {
    const {email, password} = data
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}))
      console.log('User singed up successfuly')
      console.log(res)
      reset()
      setActive(false)
      
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label>
              <div>Email</div>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Enter a valid email'
                }
                })}
              />
            </label>
            <div>{
            errors?.email && 
            <p style={{color:'red', marginTop: '4px'}}>{(errors.email?.message) as ReactNode}</p>
            }</div>
          </div>
          <div className="input-container">
            <label>
              <div>Password</div>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength:{value: 5, message: 'Password must be longer than 5 characters'}
                })}
              />
            </label>
            <div>{
            errors?.password && 
            <p style={{color:'red', marginTop: '4px'}}>{(errors?.password?.message) as ReactNode}</p>
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
