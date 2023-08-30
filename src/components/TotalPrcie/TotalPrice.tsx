import { FC } from "react"
import { ICartLaptopList } from "../../types/cart.types"
import { total } from "../../utils/utils"

interface ITotalPriceProps {
    cartProducts:ICartLaptopList
}
const TotalPrice:FC<ITotalPriceProps> = ({cartProducts}) => {
  return (
    <div className="cartWindow__total">
    Total price of all elements in cart is {total(cartProducts)} ₴
  </div>
  )
}

export default TotalPrice
