import './Laptops.scss';
import { useFetchLaptopsQuery } from '../../redux/Slices/api/laptopApiSlice';
import { FC, useEffect } from 'react';
import { LaptopCard } from '../LaptopCard/LaptopCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {  loadLaptops } from '../../redux/Slices/LaptopSlice';
import Preloader from '../Preloader/Preloader';
import { ILaptop } from '../../types/laptop.types';
import { ToastContainer, toast } from 'react-toastify';
export const Laptops:FC = () => {

  const dispatch = useAppDispatch()
  const laptops = useAppSelector(state => state.laptop.laptops)
  
  const {data,error, isLoading}= useFetchLaptopsQuery()


  useEffect(() => {
    if (data) {
      dispatch(loadLaptops(data))
    }
  },[data,dispatch])


  useEffect(() => {
    if (error) {
      if ('data' in error) {
        toast.error(JSON.stringify(error.data), {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    }
  },[error])

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
      <ToastContainer/>
      <div className="laptops__container">
        {
        isLoading ? <Preloader/> : laptops?.map((laptop, index) => {

          return(
              laptopRender(laptop, index)
          )
        })
        
        }
      </div>
    </div>
  )
}
