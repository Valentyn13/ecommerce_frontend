import { useAppSelector } from "../../redux/hooks";
import { BsPersonCircle as ProfileIcon } from "react-icons/bs";
import "./Profile.scss";
import { Link } from "react-router-dom";

export const Profile = () => {
  const user = useAppSelector((state) => state.auth.userInfo);
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
              <div className="purchase__item">
                Product
              </div>
            </div>
          </div>
        </div>
      )}
      {!user && <div style={{}}>No user data</div>}
    </div>
  );
};
