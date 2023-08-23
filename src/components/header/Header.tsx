import { logout } from "../../redux/Slices/AuthSlice";
import "./Header.scss";
import { useNavigate} from "react-router-dom";
import { RiShoppingCart2Line as ShopingCart } from "react-icons/ri";
import { MdOutlineArrowForwardIos as CatalogArrow } from "react-icons/md";
import { FiLogIn as LoginIcon } from "react-icons/fi";
import { HiOutlineViewGrid as CatalogIcon } from "react-icons/hi";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BsPersonCircle as ProfileIcon } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch()
  // const [loginModalActive, setLogInModalActive] = useState<boolean>(false);
  // const [registerModalActive, setRegisterModalActive] =
  //   useState<boolean>(false);


    const logoutHandler = async () => {
        try {
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
                <div className="header__user_email">{user.user.email}</div>
              </div>
                <ul className="drop-menu">
                    <li className="drop-menu-item">
                        <Link to="profile">Profile</Link>
                    </li>
                    <li className="drop-menu-item" onClick={logoutHandler}>
                        <a href="" style={{color: 'red'}}>Logout</a>
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
                onClick={() =>navigate('/register') }
              >
                <h4>Sign Up</h4>
                <div>
                  <LoginIcon />
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
    </header>
  );
};
