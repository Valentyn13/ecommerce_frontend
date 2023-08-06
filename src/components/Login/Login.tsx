import { useForm } from "react-hook-form";
import "./Login.scss";
export const Login = () => {
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = (data: any) => {
    console.log(data);
    reset()
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
                  required: 'Fiels is required',
                  minLength:{value: 3, message: 'Username must be longer than 3 characters'}
                })}
              />
            </label>
            <div>{
            errors?.name && 
            <p style={{color:'red', marginTop: '4px'}}>{errors.name.message}</p>
            }</div>
          </div>
          <div className="input-container">
            <label>
              <div>Email</div>
              <input
                type="text"
                {...register("email", {
                    required: 'Fiels is required',
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Enter a valid email'
                    }
                })}
              />
            </label>
            <div>{
            errors?.email && 
            <p style={{color:'red', marginTop: '4px'}}>{errors.email.message}</p>
            }</div>
          </div>
          <div className="input-container input-container-last">
            <label>
              <div>Password</div>
              <input
                type="password"
                {...register("password", {
                    required: 'Fiels is required',
                    minLength:{value: 5, message: 'Password must be longer than 5 characters'}
                })}
              />
            </label>
            <div>{
            errors?.password && 
            <p style={{color:'red', marginTop: '4px'}}>{errors.password.message}</p>
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
