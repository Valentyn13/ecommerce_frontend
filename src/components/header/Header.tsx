import { MouseEventHandler, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Modal from "../Modal/Modal";
import CartWindow from "../CartWindow/CartWindow";
import Favourites from "../Favourites/Favourites";
import CompareWindow from "../CompareWindow/CompareWindow";
import { clearCart } from "../../redux/Slices/CartSlice";
import { logout } from "../../redux/Slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { RiShoppingCart2Line as ShopingCart } from "react-icons/ri";
import { MdOutlineArrowForwardIos as CatalogArrow } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { FiLogIn as LoginIcon } from "react-icons/fi";
import { HiOutlineViewGrid as CatalogIcon } from "react-icons/hi";
import { BsPersonCircle as ProfileIcon } from "react-icons/bs";
import {
  RxHamburgerMenu as BurgerButton,
  RxCross1 as CloseBurger,
} from "react-icons/rx";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const favourites = useAppSelector(
    (state) => state.compareAndFavourite.favourite
  );
  const compareList = useAppSelector(
    (state) => state.compareAndFavourite.compare
  );
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const user = useAppSelector((state) => state.auth.userInfo);

  const [isCartActive, setIsCartActive] = useState(false);
  const [isFavouritesActive, setIsFavouritesActive] = useState(false);
  const [isCompareModalActive, setIsCompareModalActive] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const logoutHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(clearCart());
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container _container">
        <div className="burger-button">
          <BurgerButton onClick={() => setIsBurgerActive(true)} />
        </div>
        <div
          className={
            isBurgerActive ? "burger-wrapper burger-active" : "burger-wrapper"
          }
        >
          <div
            className="header__catalog catalog"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="catalog__icon">
              <CatalogIcon />
            </div>
            <h3 className="catalog__text">Catalog</h3>
            <div className="catalog__arrow">
              <CatalogArrow />
            </div>
          </div>
          <div className="header__options">
            <div
              className="close-burger"
              onClick={() => setIsBurgerActive(false)}
            >
              <CloseBurger />
            </div>
            {user && (
              <div className="menu-wrap">
                <ul className="menu">
                  <li className="menu-item">
                    <div className="header__user">
                      <div className="header__user_logo">
                        <ProfileIcon />
                      </div>
                      <div className="header__user_email">
                        {user.user.email}
                      </div>
                    </div>
                    <ul className="drop-menu">
                      <li
                        className="drop-menu-item"
                        onClick={() => {
                          setIsBurgerActive(false);
                        }}
                      >
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li className="drop-menu-item">
                        <button
                          onClick={(e) => {
                            setIsBurgerActive(false);
                            logoutHandler(e);
                          }}
                          style={{
                            color: "red",
                            backgroundColor: "transparent",
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
            <div className="header__options__hw-icons">
              <div onClick={() => setIsFavouritesActive(true)}>
                <MdFavorite />
                {favourites.length > 0 && (
                  <div className="hw-icons__count">{favourites.length}</div>
                )}
              </div>
              <div onClick={() => setIsCompareModalActive(true)}>
                <FaScaleUnbalanced />
                {compareList.length > 0 && (
                  <div className="hw-icons__count">{compareList.length}</div>
                )}
              </div>
            </div>
            {!user && (
              <div className="header__dropdown">
                <div
                  className="header__auth"
                  onClick={() => {
                    setIsBurgerActive(false);
                    navigate("/register");
                  }}
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
                  onClick={() => {
                    setIsBurgerActive(false);
                    setIsCartActive(true);
                  }}
                />
                {cartItems.length > 0 && (
                  <div className="cart__item_count"> {cartItems.length}</div>
                )}
              </div>
              <h4 className="cart__text">Cart</h4>
            </div>
          </div>
        </div>
      </div>
      <Modal
        contentWidth="475px"
        contentHeight="100%"
        modalJustifyContent="flex-end"
        active={isCartActive}
        setActive={setIsCartActive}
        children={<CartWindow setIsActive={setIsCartActive} />}
      />
      <Modal
        contentWidth="475px"
        contentHeight="100%"
        modalJustifyContent="flex-end"
        active={isFavouritesActive}
        setActive={setIsFavouritesActive}
        children={<Favourites setIsFavouriteActive={setIsFavouritesActive} />}
      />
      <Modal
        active={isCompareModalActive}
        setActive={setIsCompareModalActive}
        children={<CompareWindow compareItems={compareList} />}
        contentHeight="100%"
        contentWidth="80%"
        modalJustifyContent="center"
      />
    </header>
  );
};

export default Header;
