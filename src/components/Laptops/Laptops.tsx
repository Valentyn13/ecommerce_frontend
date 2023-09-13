import { FC } from "react";

import LaptopCard from "../LaptopCard/LaptopCard";
import Pagination from "../Pagination/Pagination";
import Preloader from "../Preloader/Preloader";
import { useAppSelector } from "../../redux/hooks";
import { ILaptop } from "../../types/laptop.types";

import "./Laptops.scss";

const Laptops: FC = () => {
  const laptopsData = useAppSelector((state) => state.laptop);

  const laptopRender = (laptop: ILaptop, index: number) => {
    if (index < 1) {
      return (
        <LaptopCard
          key={laptop._id}
          laptopProps={laptop}
          isAction={true}
          inSale={true}
        />
      );
    }
    if (index < 3) {
      return (
        <LaptopCard key={laptop._id} laptopProps={laptop} isAction={true} />
      );
    }
    return <LaptopCard key={laptop._id} laptopProps={laptop} />;
  };

  return (
    <div className="laptops">
      <div className="laptops__container">
        {!laptopsData.isLoadSuccess && <Preloader />}
        {laptopsData.isLoadSuccess && laptopsData.laptops.length === 0 && (
          <div className="not-items-by-filters">
            Laptops not found by active parameters
          </div>
        )}
        {laptopsData.laptops.length > 0 &&
          laptopsData.laptops.map((laptop, index) => {
            return laptopRender(laptop, index);
          })}
      </div>
      <Pagination />
    </div>
  );
};

export default Laptops;
