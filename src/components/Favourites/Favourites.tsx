import { Dispatch, FC } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ILaptop } from "../../types/laptop.types";
import { removeFavourite } from "../../redux/Slices/comprasionAndFavouriteSlice";

import "./Favourites.scss";

interface IFavouritesCardProps {
  favouriteElement: ILaptop;
  setModalActive: Dispatch<React.SetStateAction<boolean>>;
}
export const FavouritesCard: FC<IFavouritesCardProps> = ({
  favouriteElement,
  setModalActive,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
            <button
              className="unfavourite"
              onClick={() => dispatch(removeFavourite(favouriteElement._id))}
            >
              Unfavourite
            </button>
            <button
              onClick={() => {
                setModalActive(false);
                navigate(`/laptop/${favouriteElement._id}`);
              }}
            >
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface IFavouritesProps {
  setIsFavouriteActive: Dispatch<React.SetStateAction<boolean>>;
}
const Favourites: FC<IFavouritesProps> = ({ setIsFavouriteActive }) => {
  const favourites = useAppSelector(
    (state) => state.compareAndFavourite.favourite
  );

  return (
    <div className="favourites">
      <h2> Your Favourites</h2>
      {favourites.map((favElement) => {
        return (
          <FavouritesCard
            setModalActive={setIsFavouriteActive}
            key={favElement._id}
            favouriteElement={favElement}
          />
        );
      })}
      <button
        className="cartWindow__close"
        onClick={() => {
          setIsFavouriteActive(false);
        }}
      >
        Close favoutites
      </button>
    </div>
  );
};

export default Favourites;
