import { FC } from "react";

import { ICheckoutFetchDataList } from "../../types/checkout.types";
import ProfileDeal from "../ProfileDeal/ProfileDeal";

interface IProfileDealsListProps {
  deals: ICheckoutFetchDataList;
}

const ProfileDealsList: FC<IProfileDealsListProps> = ({ deals }) => {
  return (
    <>
      <h2
        style={{
          fontSize: "32px",
          margin: "30px 0 20px 0",
          textAlign: "center",
        }}
      >
        Your deals
      </h2>
      {deals.map((deal) => {
        return <ProfileDeal deal={deal} />;
      })}
    </>
  );
};

export default ProfileDealsList;
