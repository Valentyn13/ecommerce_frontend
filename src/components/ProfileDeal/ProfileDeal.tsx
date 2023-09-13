import { FC } from "react";

import { ICheckoutFetchData } from "../../types/checkout.types";

import "./ProfileDeal.scss";

interface IProfileDealProps {
  deal: ICheckoutFetchData;
}
const ProfileDeal: FC<IProfileDealProps> = ({ deal }) => {
  return (
    <div className="deal">
      <div className="deal__items">
        {deal.products.map((product) => {
          return (
            <div className="deal__item">
              <div className="deal__item_image">
                <img src={product.product.mainImage} alt="laptop image" />
              </div>
              <div className="deal__item_info">
                <p>Name: {product.product.name}</p>
                <p>Producer: {product.product.producer}</p>
                <p style={{ color: "rgb(236, 97, 97)" }}>
                  Price per one laptop: {product.product.price} ₴{" "}
                </p>
              </div>
              <div className="deal__item_metrics">
                <p>Amount: {product.amount}</p>
                <p style={{ color: "rgb(236, 97, 97)" }}>
                  Total price:{product.product.price * product.amount} ₴{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="deal__info">
        <h3>Price of a deal:</h3>
        <div className="deal__price">{deal.totalPrice} ₴</div>
      </div>
    </div>
  );
};

export default ProfileDeal;
