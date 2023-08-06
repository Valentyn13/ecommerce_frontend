import { RiShoppingCart2Line as ShopingCart} from 'react-icons/ri';
import {MdOutlineArrowForwardIos as CatalogArrow} from 'react-icons/md';
import {FiLogIn as LoginIcon} from 'react-icons/fi';
import {AiOutlineMenuUnfold as CatalogIcon} from 'react-icons/ai';
//import {BsPersonCircle as ProfileIcon} from 'react-icons/bs'

import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
        <div className="header__container _container">
            <div className="header__catalog catalog">
                <div className='catalog__icon'><CatalogIcon/></div>
                <h3 className="catalog__text">Catalog</h3>
                <div className='catalog__arrow'><CatalogArrow/></div>
            </div>
            <div className="header__options">
                <div className="header__auth">
                    <h4>Log In</h4>
                    <div>
                        <LoginIcon/>
                    </div>
                </div>
                <div className="header__cart cart">
                    <div><ShopingCart/></div>
                    <h4 className="cart__text">Cart</h4>
                </div>
            </div>
        </div>
    </header>
  )
}
