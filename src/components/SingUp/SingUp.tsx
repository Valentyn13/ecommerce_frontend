import { useForm } from "react-hook-form";
import "./Login.scss";
import { ReactNode, FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCredentials } from "../../redux/Slices/AuthSlice";
import { useRegisterMutation } from "../../redux/Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import 'react-toastify/ReactToastify.min.css'
import { ToastContainer, toast } from "react-toastify";

export const SingUp:FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [registerUser, {error}] = useRegisterMutation()
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
      dispatch(setCredentials({...res}))
      
    } catch (error) {
      console.log(error)
    }
  };


  const { userInfo } = useAppSelector((state) => state.auth)

useEffect(() => {
  if (userInfo) {
    console.log('Userinfo => passed!')
    navigate('/')
  }
},[userInfo]);


useEffect(() => {
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
},[error]);

  return (
    <div className="login">
      <ToastContainer/>
      <div className="form__container">
        <h2 className="form_header">Sign Up </h2>
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
        <p className="to-login">Already have an accoutn? Go to <span onClick={() => navigate('/login')}>login</span> page</p>
        <p onClick={() => navigate('/')} style={{color:'red', marginTop:'10px', textAlign:'center', cursor:'pointer'}}>Back</p>
      </div>
    </div>
  );
};
