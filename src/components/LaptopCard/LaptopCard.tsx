import {FC} from 'react'
import './LaptopCard.scss'
import {AiOutlineShoppingCart as CartButton} from 'react-icons/ai'
import {AiOutlineHeart as HeartButton} from 'react-icons/ai'
import {LiaBalanceScaleSolid as Weights} from 'react-icons/lia'
import { ILaptop } from '../../redux/Slices/LaptopSlice'
interface ILaptopCardProps {
  isAction?: boolean;
  inSale?:boolean;
  laptopProps: ILaptop
}

export const LaptopCard:FC<ILaptopCardProps> = ({laptopProps, isAction, inSale}) => {
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
            <div className='laptop_card__cart'>
            <CartButton/>
            </div>
            </div>
        </div>
        <div className="view-more">
          <button>View details</button>
        </div>
    </div>
  )
}
