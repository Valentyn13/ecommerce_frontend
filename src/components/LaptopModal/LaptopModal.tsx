import { ILaptop } from '../../redux/Slices/LaptopSlice';
import {FC, Dispatch} from 'react'
import './LaptopModal.scss'
interface ILaptopModalProps {
    modalProps: ILaptop
    setActive:Dispatch<React.SetStateAction<boolean>>
    isElementInCart: boolean
    handleIsInCartController: () => void
    isCartIncludeItem:  () => boolean
}

const LaptopModal:FC<ILaptopModalProps> = ({modalProps, setActive, isElementInCart, handleIsInCartController, isCartIncludeItem}) => {
    const {CPU, screen, hardDrive, videoCard} = modalProps
    return(
        <div className='laptopModal'>
            <div className="laptopModal__container _container">
                <div className="laptopModal__headerSection">
                    <div className="laptopModal__slider laptopSlider">
                        <img src={modalProps.mainImage} alt="product main image" />
                    </div>
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
        </div>
    )
}


export default LaptopModal;