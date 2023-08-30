import { FC, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import  LaptopCard  from '../LaptopCard/LaptopCard';
import Preloader from '../Preloader/Preloader';
import { useFetchLaptopsQuery } from '../../redux/Slices/api/laptopApiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {  loadLaptops } from '../../redux/Slices/LaptopSlice';
import { ILaptop } from '../../types/laptop.types';

import "react-toastify/ReactToastify.min.css";
import './Laptops.scss';

const Laptops:FC = () => {

  const dispatch = useAppDispatch()
  const laptops = useAppSelector(state => state.laptop.laptops)
  
  const {data,error, isLoading, isSuccess}= useFetchLaptopsQuery()

  const laptopRender = (laptop: ILaptop,index: number) => {

    if (index < 1) {
      return <LaptopCard key={laptop._id} laptopProps={laptop} isAction={true} inSale={true}/>
    }
    if (index < 3) {
      return <LaptopCard key={laptop._id} laptopProps={laptop} isAction={true}/>
    }
    return<LaptopCard key={laptop._id} laptopProps={laptop}/>
  }

  useEffect(() => {
    if (data) {
      dispatch(loadLaptops(data))
    }
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
  },[data,dispatch, error])

  return (
    <div className='laptops'>
      <ToastContainer/>
      <div className="laptops__container">
        {
          isLoading && (<Preloader/>)  
        }
        {
          isSuccess && (
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
