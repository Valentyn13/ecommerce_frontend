import { useState } from "react";
import { useLogoutApiCallMutation } from "../../redux/Slices/usersApiSlice";
import { logout } from "../../redux/Slices/AuthSlice";
import "./Header.scss";

import { RiShoppingCart2Line as ShopingCart } from "react-icons/ri";
import { MdOutlineArrowForwardIos as CatalogArrow } from "react-icons/md";
import { FiLogIn as LoginIcon } from "react-icons/fi";
import { HiOutlineViewGrid as CatalogIcon } from "react-icons/hi";
import { Modal } from "../Modal/Modal";
import { SingUp } from "../SingUp/SingUp";
import { LogIn } from "../Login/Login";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BsPersonCircle as ProfileIcon } from "react-icons/bs";

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch()
  const [logoutApiCall] = useLogoutApiCallMutation();
  const [signUpModalActive, setSignUpModalActive] = useState<boolean>(false);
  const [registerModalActive, setRegisterModalActive] =
    useState<boolean>(false);


    const logoutHandler = async () => {
        try {
          const res = await logoutApiCall('').unwrap();

          dispatch(logout())
          console.log('User Logout up successfuly')

          
        } catch (err) {
          console.log(err)
        }
      };

  return (
    <header className="header">
      <div className="header__container _container">
        <div className="header__catalog catalog">
          <div className="catalog__icon">
            <CatalogIcon />
          </div>
          <h3 className="catalog__text">Catalog</h3>
          <div className="catalog__arrow">
            <CatalogArrow />
          </div>
        </div>
        <div className="header__options">
          {user && (
<div className="menu-wrap">
        <ul className="menu">
            <li className="menu-item">
            <div className="header__user">
                <div className="header__user_logo">
                  <ProfileIcon />
                </div>
                <div className="header__user_email">{user.email}</div>
              </div>
                <ul className="drop-menu">
                    <li className="drop-menu-item">
                        <a href="#">Profile</a>
                    </li>
                    <li className="drop-menu-item" onClick={logoutHandler}>
                        <a href="#" style={{color: 'red'}}>Logout</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
          )}
          {!user && (
            <div className="header__dropdown">
              <div
                className="header__auth"
                onClick={() => setRegisterModalActive(true)}
              >
                <h4>Sign Up</h4>
                <div>
                  <LoginIcon />
                </div>
              </div>
              <div className="header__dropdown_content">
                <div
                  className="header__auth dropdown-elem"
                  onClick={() => setSignUpModalActive(true)}
                >
                  <h4>Log In</h4>
                  <div>
                    <LoginIcon />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="header__cart cart">
            <div>
              <ShopingCart />
            </div>
            <h4 className="cart__text">Cart</h4>
          </div>
        </div>
      </div>
      <Modal
        active={registerModalActive}
        setActive={setRegisterModalActive}
        type="Sign Up"
      >
        <SingUp />
      </Modal>
      <Modal
        active={signUpModalActive}
        setActive={setSignUpModalActive}
        type="Log In"
      >
        <LogIn />
      </Modal>
    </header>
  );
};
