import './Laptops.scss';
import { useFetchLaptopsMutation } from '../../redux/Slices/laptopApiSlice';
import { useEffect } from 'react';
import { LaptopCard } from '../LaptopCard/LaptopCard';

export const Laptops = () => {

  const [getLaptops] = useFetchLaptopsMutation()



  useEffect( () => {
    const fetchLaptops = async() => {
      const res = await getLaptops('').unwrap()
      console.log(res)
      return res
    }
    fetchLaptops()
  }, [])
  return (
    <div className='laptops'>
      <div className="laptops__container">
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
        <LaptopCard/>
      </div>
    </div>
  )
}
