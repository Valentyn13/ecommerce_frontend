import { FC } from 'react';

import  LaptopCard  from '../LaptopCard/LaptopCard';
import Preloader from '../Preloader/Preloader';
import { useAppSelector } from '../../redux/hooks';
import { ILaptop } from '../../types/laptop.types';

import './Laptops.scss';

const Laptops:FC = () => {


  const laptops = useAppSelector(state => state.laptop.laptops)
  
  const laptopRender = (laptop: ILaptop,index: number) => {
    if (index < 1) {
      return <LaptopCard key={laptop._id} laptopProps={laptop} isAction={true} inSale={true}/>
    }
    if (index < 3) {
      return <LaptopCard key={laptop._id} laptopProps={laptop} isAction={true}/>
    }
    return<LaptopCard key={laptop._id} laptopProps={laptop}/>
  }

  return (
    <div className='laptops'>
      <div className="laptops__container">
        {
          laptops.length === 0 && (<Preloader/>)  
        }
        {
          laptops.length > 0 && (
            laptops.map((laptop, index) => {

              return(
                  laptopRender(laptop, index)
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default Laptops
