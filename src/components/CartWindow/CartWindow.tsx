import { ILaptop } from "../../redux/Slices/LaptopSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import './CartWindow.scss'
import { ICartItem, removeItem,increaseAmount, decreaseAmount } from "../../redux/Slices/CartSlice"
import Preloader from "../Preloader/Preloader"

const CartWindow = () => {
    const dispatch = useAppDispatch();
    const cartElements = useAppSelector((state) => state.cart.cartItems) as ICartItem<ILaptop>[]
    const total = (arr: ICartItem<ILaptop>[]) => arr.reduce((acc,element) => { 
        return acc = acc + (element.product.price * element.amount)
    },0)
    return(
        <div className="cartWindow">
            
            {!cartElements? <Preloader/> : cartElements.map((element) => {
                return(
                    <div key={element.product._id} className="cartWindow__cartElement cartElement">
                        <div className="cartElement__image">
                            <img src={element.product.mainImage} alt="product image" />
                        </div>
                        <div className="cartElement__properties">
                            <div className="cartElement__name">{element.product.name}</div>
                            <p className="cartElement__price">{element.product.price} ₴ </p>
                            <div className="cartElement__producer">{element.product.producer}</div>
                            <div className="cartElement__options">
                                <button onClick={() => dispatch(removeItem(element.product._id))}>Remove</button>
                                <div className="cartElement__amount">
                                    <button onClick={() => dispatch(increaseAmount(element.product._id))}>+1</button>
                                    <button onClick={() => dispatch(decreaseAmount(element.product._id))}>-1</button>
                                </div>
                                <div>Amount: {element.amount}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="cartWindow__total">
                Total price of all elements in cart is {total(cartElements)} ₴
            </div>
        </div>
    )
}


export default CartWindow;