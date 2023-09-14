import { Routes, Route } from "react-router-dom";

import SingUp from "./SingUp/SingUp";
import LogIn from "./Login/Login";
import Home from "../pages/Home.page";
import ProfilePpage from "../pages/Profile.page";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AdminPage from "../pages/Admin.page";
import CheckoutPage from "../pages/Checkout.page";

import { useAppSelector } from "../redux/hooks";
import Hero from "./Hero/Hero";
import LaptopPage from "./LaptopPage/LaptopPage";

const App = () => {
  const userinfo = useAppSelector((state) => state.auth.userInfo);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Hero />} />
          <Route
          path="laptop/:id"
          element= {<LaptopPage/>}
          />
          <Route
            path="profile"
            element={
              <PrivateRoute isAllowed={!!userinfo} redirectPath="/register">
                <ProfilePpage />
              </PrivateRoute>
            }
          />
          <Route
            path="admin"
            element={
              <PrivateRoute
                isAllowed={!!userinfo && userinfo.user.role === "ADMIN"}
                redirectPath="/profile"
              >
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<SingUp />} />
          <Route path="login" element={<LogIn />} />
          <Route
            path="checkout"
            element={
              <PrivateRoute isAllowed={!!userinfo} redirectPath="/register">
                <CheckoutPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
