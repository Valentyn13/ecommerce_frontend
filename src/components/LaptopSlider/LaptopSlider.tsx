import { FC , useState } from "react";

import { ISliderImagesFetchData } from "../../types/sliderImages.types";
import { useGetSliderImagesQuery } from "../../redux/Slices/api/sliderImagesApiSlice";

import "./LaptopSlider.scss";
import Preloader from "../Preloader/Preloader";

interface ILaptopSliderProps {
  id: string;
}

const LaptopSlider: FC<ILaptopSliderProps> = ({ id }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const { data, isSuccess, isLoading } = useGetSliderImagesQuery(id);

  const nextSlide = (data: ISliderImagesFetchData) => {
    const isLastSlide = currentSlideIndex === data.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlideIndex + 1;
    setCurrentSlideIndex(newIndex);
  };

  const prevSlide = (data: ISliderImagesFetchData) => {
    const isFirst = currentSlideIndex === 0;
    const newIndex = isFirst ? data.images.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newIndex);
  };

  return (
    <>
    {isLoading && (<Preloader/>)}
      {isSuccess && data && (
        <>
          <div>
            <img
              className="slider-img"
              src={data.images[currentSlideIndex]}
              alt="slider image"
            />
          </div>
          <img
            onClick={() => nextSlide(data)}
            className="arrow_next"
            src="/arrow2.png"
            alt="arrow"
          />
          <img
            onClick={() => prevSlide(data)}
            className="arrow_prev"
            src="/arrow2.png"
            alt="arrow"
          />
        </>
      )}
    </>
  );
};

export default LaptopSlider;
