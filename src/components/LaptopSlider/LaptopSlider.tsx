import { FC, useState } from "react";
import { ISliderImagesFetchData } from "../../types/sliderImages.types";

interface ILaptopSliderProps {
  images: ISliderImagesFetchData;
  isActive: boolean;
  mainImage: string
}

export const LaptopSlider: FC<ILaptopSliderProps> = ({ images, isActive }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentSlideIndex === images.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlideIndex + 1;
    setCurrentSlideIndex(newIndex);
  };

  const prevSlide = () => {
    const isFirst = currentSlideIndex === 0;
    const newIndex = isFirst ? images.images.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newIndex);
  };
  return (
    <>
      {isActive && images && (
        <div className="laptopModal__slider laptopSlider">
          <img className="slider-img" src={images.images[currentSlideIndex]} alt="slider image" />
          <img
            onClick={nextSlide}
            className="arrow_next"
            src="/arrow2.png"
            alt="arrow"
          />
          <img
            onClick={prevSlide}
            className="arrow_prev"
            src="/arrow2.png"
            alt="arrow"
          />
        </div>
      )}
    </>
  );
};
