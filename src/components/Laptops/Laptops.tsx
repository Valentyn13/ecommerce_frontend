import './Laptops.scss';
import { useFetchLaptopsMutation } from '../../redux/Slices/api/laptopApiSlice';
import { useEffect } from 'react';
import { LaptopCard } from '../LaptopCard/LaptopCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ILaptop, loadLaptops } from '../../redux/Slices/LaptopSlice';
export const Laptops = () => {

  const dispatch = useAppDispatch()
  const laptops = useAppSelector(state => state.laptop.laptops)
  const [getLaptops] = useFetchLaptopsMutation()



  useEffect( () => {
    const fetchLaptops = async() => {
      const res = await getLaptops('').unwrap()
      dispatch(loadLaptops(res))
      console.log(res)
      return res
    }
    fetchLaptops()
  }, [])

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
        {laptops.map((laptop, index) => {

          return(
              laptopRender(laptop, index)
          )
        })}
      </div>
    </div>
  )
}
