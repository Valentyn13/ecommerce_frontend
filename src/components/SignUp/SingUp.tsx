import { useForm } from "react-hook-form";
import axios from 'axios'
export const SingUp = () => {
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
    try {
      const res = await axios.post('http://localhost:4200/api/user/login',data)
      console.log(res.data)
      reset()
      
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
            <p style={{color:'red', marginTop: '4px'}}>{errors.email?.message}</p>
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
            <p style={{color:'red', marginTop: '4px'}}>{errors?.password?.message}</p>
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
