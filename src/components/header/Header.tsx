import {useState} from 'react'


import './Header.scss';

import { RiShoppingCart2Line as ShopingCart} from 'react-icons/ri';
import {MdOutlineArrowForwardIos as CatalogArrow} from 'react-icons/md';
import {FiLogIn as LoginIcon} from 'react-icons/fi';
import {HiOutlineViewGrid as CatalogIcon} from 'react-icons/hi';
import {HiChevronDoubleRight as SignUpIcon} from 'react-icons/hi' 
import { Modal } from '../Modal/Modal';
import { Login } from '../Login/Login';
import { SingUp } from '../SignUp/SingUp';
//import {BsPersonCircle as ProfileIcon} from 'react-icons/bs'

export const Header = () => {
    const [signUpModalActive, setSignUpModalActive] = useState<boolean>(false)
    const [registerModalActive, setRegisterModalActive] = useState<boolean>(false)

  return (
    <header className="header">
        <div className="header__container _container">
            <div className="header__catalog catalog">
                <div className='catalog__icon'><CatalogIcon/></div>
                <h3 className="catalog__text">Catalog</h3>
                <div className='catalog__arrow'><CatalogArrow/></div>
            </div>
            <div className="header__options">
                <div className="header__dropdown">
                <div className="header__auth" onClick={() => setRegisterModalActive(true)}>
                    <h4>Log In</h4>
                    <div>
                        <LoginIcon/>
                    </div>
                </div>
                <div className='header__dropdown_content'>
                <div className="header__auth dropdown-elem" onClick={() => setSignUpModalActive(true)} >
                    <h4>Sign Up</h4>
                    <div>
                        <SignUpIcon/>
                    </div>
                </div>
                </div>
                </div>

                <div className="header__cart cart">
                    <div><ShopingCart/></div>
                    <h4 className="cart__text">Cart</h4>
                </div>
            </div>
        </div>
        <Modal active={registerModalActive} setActive={setRegisterModalActive} type='Log In'>
            <Login/>
        </Modal>
        <Modal active={signUpModalActive} setActive={setSignUpModalActive} type='Sign Up'>
            <SingUp/>
        </Modal>
    </header>
  )
}
