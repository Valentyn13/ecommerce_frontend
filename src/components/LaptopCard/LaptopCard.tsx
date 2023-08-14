import './LaptopCard.scss'
export const LaptopCard = () => {
  return (
    <div className='laptop_card__wrapper'>
        <div className="laptop_card__img">
            <img src="/lap1.1.avif" alt="laptop image" />
        </div>
        <div className="laptop_card__info">
            <p>Name: Asus</p>
            <p>Price: 24000</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium blanditiis placeat</p>
        </div>
    </div>
  )
}
