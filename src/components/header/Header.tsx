import { MouseEventHandler, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Modal from "../Modal/Modal";
import CartWindow from "../CartWindow/CartWindow";
import { clearCart } from "../../redux/Slices/CartSlice";
import { logout } from "../../redux/Slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { RiShoppingCart2Line as ShopingCart } from "react-icons/ri";
import { MdOutlineArrowForwardIos as CatalogArrow } from "react-icons/md";
import { FiLogIn as LoginIcon } from "react-icons/fi";
import { HiOutlineViewGrid as CatalogIcon } from "react-icons/hi";
import { BsPersonCircle as ProfileIcon } from "react-icons/bs";

import "./Header.scss";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const user = useAppSelector((state) => state.auth.userInfo);

  const [isCartActive, setIsCartActive] = useState(false);

  const logoutHandler:MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(clearCart())
    dispatch(logout());
    navigate("/")
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
                    <div className="header__user_email">{user.user.email}</div>
                  </div>
                  <ul className="drop-menu">
                    <li className="drop-menu-item">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li className="drop-menu-item" >
                      <button
                      onClick={logoutHandler}
                        style={{ color: "red", backgroundColor: "transparent" }}
                      >
                        Logout
                      </button>
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
                onClick={() => navigate("/register")}
              >
                <h4>Sign Up</h4>
                <div>
                  <LoginIcon />
                </div>
              </div>
            </div>
          )}

          <div className="header__cart cart">
            <div style={{ position: "relative" }}>
              <ShopingCart
                style={{ cursor: "pointer" }}
                onClick={() => setIsCartActive(true)}
              />
              {cartItems.length > 0 && (
                <div className="cart__item_count"> {cartItems.length}</div>
              )}
            </div>
            <h4 className="cart__text">Cart</h4>
          </div>
        </div>
      </div>
      <Modal
        contentWidth="475px"
        contentHeight="100%"
        modalJustifyContent="flex-end"
        active={isCartActive}
        setActive={setIsCartActive}
        children={<CartWindow setIsActive={setIsCartActive}/>}
      />
    </header>
  );
};

export default Header;
