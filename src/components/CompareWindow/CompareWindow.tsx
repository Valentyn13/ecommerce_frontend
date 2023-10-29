import { FC } from "react";

import { useAppDispatch } from "../../redux/hooks";
import { findMainImage } from "../../utils/utils";
import { removeItemFromCompateList } from "../../redux/Slices/comprasionAndFavouriteSlice";

import "./CompareWindow.scss";

interface IDeleteFromCompareProps {
  id: string;
}

const DeleteFromCompare: FC<IDeleteFromCompareProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="actions_container">
        <button
          className="comp-remove-btn"
          onClick={() => dispatch(removeItemFromCompateList(id))}
        >
          Remove
        </button>
      </div>
    </>
  );
};

interface compareItem {
  data: string[];
  keys: string[];
  _id: string;
}

interface ICompareWindowProps {
  compareItems: compareItem[];
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const CompareWindow: FC<ICompareWindowProps> = ({ setActive, compareItems }) => {
  const [firstItem, secondItem] = compareItems;
  return (
    <div className="compareWindow _container">
      <div className="table">
        <div className="table__container">
          <div className="table__images-container">
            {firstItem && (
              <img src={findMainImage(firstItem.data)} alt="main image" />
            )}
            {secondItem && (
              <img src={findMainImage(secondItem.data)} alt="main image" />
            )}
          </div>
          <div className="table__data-container">
            <div className="table__column key_column">
              {firstItem &&
                firstItem.keys.map((key) => {
                  if (key !== "mainImage") return <div>{key}</div>;
                })}
            </div>
            <div className="table__column">
              {firstItem &&
                firstItem.data.map((data) => {
                  if (String(data).slice(0, 4) !== "data")
                    return <div>{data}</div>;
                })}
            </div>
            <div className="table__column">
              {secondItem &&
                secondItem.data.map((data) => {
                  if (String(data).slice(0, 4) !== "data")
                    return <div>{data}</div>;
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="compareWindow__actions">
        {
          compareItems.map(item => {
            return <DeleteFromCompare id={item._id}/>
          })
        }
      </div>
      <div className="close_window_controller">
        <button className="close_window" onClick={() => setActive(false)}> Close window</button>
      </div>
    </div>
  );
};

export default CompareWindow;
