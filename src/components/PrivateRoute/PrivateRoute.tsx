
import { Navigate, Outlet } from "react-router-dom";
import { FC, ReactNode } from "react";

interface IPrivateRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  children:ReactNode
}

export const PrivateRoute:FC<IPrivateRouteProps> = ({isAllowed, redirectPath, children}) => {
    if(!isAllowed) return<Navigate to={redirectPath}/>

  return children ? children : <Outlet/>
}
