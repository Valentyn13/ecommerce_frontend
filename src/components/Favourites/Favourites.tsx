import "./Favourites.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ILaptop } from "../../types/laptop.types";
import { FC } from "react";
import { removeFavourite } from "../../redux/Slices/comprasionAndFavouriteSlice";

interface IFavouritesCardProps {
  favouriteElement: ILaptop;
}
export const FavouritesCard: FC<IFavouritesCardProps> = ({
  favouriteElement,
}) => {
    const dispatch = useAppDispatch()

  return (
    <div className="favouriteCard">
      <div className="favouriteCard__image">
        <img src={favouriteElement.mainImage} alt="product image" />
      </div>
      <div className="favouriteCard__properties">
        <div className="favouriteCard__name">{favouriteElement.name}</div>
        <div className="favouriteCard__options">
            <div className="favouriteCard__props">
            <p className="favouriteCard__price">{favouriteElement.price} ₴ </p>
          <div className="favouriteCard__producer">
            {favouriteElement.producer}
          </div>
            </div>
            <div className="favouriteCard__options-elements">
                <button className="unfavourite" onClick={() => dispatch(removeFavourite(favouriteElement._id))}>Unfavourite</button>
                <button>More</button>
            </div>
        </div>
      </div>
    </div>
  );
};

const Favourites = () => {
  const favourites = useAppSelector(
    (state) => state.compareAndFavourite.favourite
  );

  return (
    <div className="favourites">
        <h2> Your Favourites</h2>
      {favourites.map((favElement) => {
        return <FavouritesCard key={favElement._id} favouriteElement={favElement} />;
      })}
    </div>
  );
};

export default Favourites;
