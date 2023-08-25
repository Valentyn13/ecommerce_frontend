import {FC, useState, useEffect} from 'react'
import './LaptopCard.scss'
import {AiOutlineShoppingCart as CartButton} from 'react-icons/ai'
import {AiOutlineHeart as HeartButton, AiFillCheckCircle as AlreadyInCart} from 'react-icons/ai'
import {LiaBalanceScaleSolid as Weights} from 'react-icons/lia'
import { ILaptop } from '../../redux/Slices/LaptopSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ICartItem, addItem, removeItem } from '../../redux/Slices/CartSlice';
import { Modal } from '../Modal/Modal'
import LaptopModal from '../LaptopModal/LaptopModal'

interface ILaptopCardProps {
  isAction?: boolean;
  inSale?:boolean;
  laptopProps: ILaptop
}

export const LaptopCard:FC<ILaptopCardProps> = ({laptopProps, isAction, inSale}) => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.cartItems) as ICartItem<ILaptop>[]

  const [isElementInCart, setIsElementInCart] = useState<boolean>(false)
  const [isViewDetailActive,setIsViewDetailActive] = useState<boolean>(false)

  const isCartIncludeItem = () => {
    let inCart = false
    cartItems.forEach(elem => {
      if(elem.product._id === laptopProps._id) inCart = true
    })
    return inCart
  }

  const addToCart = () => {
    setIsElementInCart(true)
    dispatch(addItem({amount:1, product: laptopProps}))
  }

  const removeFromCart = () => {
    setIsElementInCart(false)
    dispatch(removeItem(laptopProps._id))
  }

  const handleCartController = () => {
    isElementInCart ? removeFromCart() : addToCart()
  }

  const cartChecker = () => {
    const inCart = cartItems.find((item) => item.product._id === laptopProps._id)

      if (inCart) setIsElementInCart(true)
  }

  useEffect(() => cartChecker(),[])

  return (
    <div className='laptop_card__wrapper'>
      {
      isAction&&(<div className='action'>Action</div>)
      }
      {
        inSale&&(<div className='sale'>Top in sale</div>)
      }
      <div className="card-icons">
        <div><HeartButton/></div>
        <div><Weights/></div>
      </div>
        <div className="laptop_card__img">
            <img src={laptopProps.mainImage} alt="laptop image" />
        </div>
        <div className="laptop_card__info">
            <div className='laptop_card__name'>{laptopProps.name}</div>
            <div className="laptop_card__bottom">
            <p>{laptopProps.price} <span>₴</span></p>
            <div className='laptop_card__cart' onClick={handleCartController}>
              {isElementInCart && isCartIncludeItem() ?<AlreadyInCart/>:<CartButton/>}
            </div>
            </div>
        </div>
        <div className="view-more">
          <button onClick={() => setIsViewDetailActive(true)}>View details</button>
        </div>
        <Modal
          active={isViewDetailActive}
          setActive={setIsViewDetailActive}
          children={<LaptopModal modalProps={laptopProps} setActive={setIsViewDetailActive}/>}
          contentHeight='100%'
          contentWidth='80%'
          modalJustifyContent='center'
        />
    </div>
  )
}
