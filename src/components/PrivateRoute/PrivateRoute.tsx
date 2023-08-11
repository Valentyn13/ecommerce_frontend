
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";


export const PrivateRoute = () => {
    const userInfo = useAppSelector((state) => state.auth);

  return userInfo ? <Outlet/> : <Navigate to='/profile' replace/>
}
