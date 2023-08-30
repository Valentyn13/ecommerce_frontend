import {FC, Dispatch, useEffect,} from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Preloader from '../Preloader/Preloader';
import  LaptopSlider from '../LaptopSlider/LaptopSlider';
import { useLazyGetSliderImagesQuery } from '../../redux/Slices/api/sliderImagesApiSlice';
import { ILaptop } from '../../types/laptop.types';
import { ISliderImagesFetchData } from '../../types/sliderImages.types';

import "react-toastify/ReactToastify.min.css";
import './LaptopModal.scss'

interface ILaptopModalProps {
    isActive: boolean
    modalProps: ILaptop
    setActive:Dispatch<React.SetStateAction<boolean>>
    isElementInCart: boolean
    handleIsInCartController: () => void
    isCartIncludeItem:  () => boolean
}

const LaptopModal:FC<ILaptopModalProps> = ({modalProps, setActive, isActive, isElementInCart, handleIsInCartController, isCartIncludeItem}) => {
    const {CPU, screen, hardDrive, videoCard} = modalProps

    const [getLaptops, {isLoading, error, data, isSuccess}] = useLazyGetSliderImagesQuery()
 
    useEffect(() => {
        if (isActive){
            getLaptops(modalProps._id)
        }
        if (error ) {
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
    }, [isActive,error,getLaptops, modalProps._id])
    return(
        <div className='laptopModal'>
            <ToastContainer/>
            {
                isLoading && (<Preloader/>)
            }
            {
                isSuccess && (
                    <div className="laptopModal__container _container">
                    <div className="laptopModal__headerSection">
                     <LaptopSlider mainImage={modalProps.mainImage} isActive={isActive} images={data as ISliderImagesFetchData}/>
                        <div className='laptopModal__mainInfo'>
                            <div>
                            <div className='laptopModal__name'>{modalProps.name}</div>
                            <div className="laptopModal__producer">Producer:{modalProps.producer}</div>
                            <div className="laptopModal__price">Price: {modalProps.price} ₴</div>
                            </div>
                            <div className="laptopModal__controllers">
                            <button className='go-back' onClick={() => setActive(false)}>Go back</button>
                            {
                            isElementInCart && isCartIncludeItem() ?
                            <button style={{backgroundColor:'lightyellow'}} onClick={handleIsInCartController} className='add-to-cart'>Remove from cart</button>:
                            <button className='add-to-cart' onClick={handleIsInCartController}>Add to cart +</button>
                            }
                            </div>
    
                        </div>
                    </div>
                    <div className="laptopModal__mainSection mainSection">
                        <div className="mainSection__screen mainSection__block">
                            <h2>Screen</h2>
                            <div className="mainSection__screen-size mainSection__element"><div><p>Screen size</p><div></div></div> {screen.size}</div>
                            <div className="mainSection__screen-matrice mainSection__element"> <div>Screen matrice type<div></div></div> {screen.screenType}</div>
                            <div className="mainSection__screen-resolution mainSection__element"><div>Screen resolution<div></div></div>{screen.resolution}</div>
                        </div>
                        <div className="mainSection__cpu mainSection__block">
                            <h2>CPU</h2>
                        <div className="mainSection__cpu-producer mainSection__element"><div>CPU producer<div></div></div>{CPU.producer}</div>
                        <div className="mainSection__cpu-model mainSection__element"><div>CPU model<div></div></div>{CPU.model}</div>
                        <div className="mainSection__cpu-cores mainSection__element"><div>Cores<div></div></div>{CPU.cores}</div>
                        </div>
                        <div className="mainSection__hardDrive mainSection__block">
                            <h2>Hard disk</h2>
                        <div className="mainSection__hardDrive-type mainSection__element"><div>Hard disk type<div></div></div>{hardDrive.hardType}</div>
                        <div className="mainSection__hardDrive-value mainSection__element"><div>Hard disk size<div></div></div>{hardDrive.value}</div>
                        </div>
                        <div className="mainSection__videoCard mainSection__block">
                            <h2>Video card</h2>
                        <div className="mainSection__videoCard-producer mainSection__element"><div>Video card producer<div></div></div>{videoCard.producer}</div>
                        <div className="mainSection__videoCard-model mainSection__element"><div>Video card model<div></div></div>{videoCard.model}</div>
                        </div>
                    </div>
                </div> 
                )
            }

        </div>
    )
}

export default LaptopModal;