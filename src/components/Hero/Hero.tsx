import { Aside } from "../Aside/Aside"
import { Laptops} from "../Main/Laptops"
import './Hero.scss'

export const Hero = () => {
  return (
    <main className="main">
        <div className="main__wrapper _container">
            <Aside/>
            <Laptops/>
        </div>
    </main>
  )
}
