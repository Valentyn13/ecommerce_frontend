import { Link } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";

import { BsPersonCircle as ProfileIcon } from "react-icons/bs";

import "./Profile.scss";
import { useGetCheckoutsQuery } from "../../redux/Slices/api/checkoutApiSlice";
import { useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import ProfileDealsList from "../ProfileDealsList/ProfileDealsList";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.userInfo);

  const {data,error,isLoading, isSuccess} = useGetCheckoutsQuery((user?.user._id) as string)

  useEffect(() => {
if(error) {
  if ('data' in error) {
    console.log(error.data)
  }

}
if(data) {
  console.log(data)
}
  }, [error,data])
      

  return (
    <div className="profile ">
      {user && (
        <div className="profile__cointainer _container">
          <div className="user__info">
            <div className="profile__header">
              <div className="profile__photo">
                <ProfileIcon />
              </div>
              <div className="profile__navigation">
                <button style={{ background: "green" }}>
                  <Link to="/">Go home</Link>
                </button>

                {user.user.role === "ADMIN" && (
                  <button style={{ background: "red" }}>
                    <Link to="/admin">Go to admin dashboard</Link>
                  </button>
                )}
              </div>
            </div>

            <div className="profile__info_container">
              <div className="profile__info_content">
                <div className="profile__id">
                  Id: <span>{user.user._id}</span>
                </div>
                <div className="profile__name">
                  Username: <span>{user.user.name}</span>
                </div>
                <div className="profile__email">
                  Email: <span>{user.user.email}</span>
                </div>
                <div>Role: {user.user.role}</div>
              </div>
            </div>
          </div>

          <div className="purchase">
            <div className="purchase__container">
              {isLoading && (<Preloader/>)}
              {data && isSuccess && (
              <ProfileDealsList deals={data}/>
              )}
              
            </div>
          </div>
        </div>
      )}
      {!user && <div style={{}}>No user data</div>}
    </div>
  );
};

export default Profile;
