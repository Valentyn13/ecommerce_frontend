import { useEffect,ReactNode, FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/Slices/api/usersApiSlice";
import { setCredentials } from "../../redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import 'react-toastify/ReactToastify.min.css'
import { ILoginData } from "../../types/user.types";

export const LogIn:FC = () => {

const navigate = useNavigate()
const dispatch = useAppDispatch();

const [login, {error, data}] = useLoginMutation();

const userInfo  = useAppSelector((state) => state.auth.userInfo)


const {
  register,
  formState: { errors, isValid },
  handleSubmit,
  reset
} = useForm<ILoginData>(
  {
    mode: 'onBlur'
  }
);

  const onSubmit:SubmitHandler<ILoginData> = (data) => {
      login(data)
      reset()
  };

  useEffect(() => {
    if (userInfo) {
      console.log('Userinfo => passed!')
      navigate('/')
    }
  },[userInfo,navigate]);
  
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data))
    }
    if (error ) {
      if ('data' in error) {
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
  },[error, data, dispatch]);

  return (
    <div className="login">
      <ToastContainer/>
      <div className="form__container">
      <h2 className="form_header">Log In </h2>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label>
              <div>Email</div>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
        <p className="to-login">Don't have an account? Go to <span onClick={() => navigate('/register')}>sign up</span> page</p>
        <p onClick={() => navigate('/')} style={{color:'red', marginTop:'10px', textAlign:'center', cursor:'pointer'}}>Back</p>
      </div>
    </div>
  );
};
