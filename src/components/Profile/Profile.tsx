import { useAppSelector } from '../../redux/hooks';
import { BsPersonCircle as ProfileIcon } from "react-icons/bs";
import './Profile.scss';
import { Link } from 'react-router-dom';

export const Profile = () => {

    const user = useAppSelector(state => state.auth.userInfo);
    return (
        <div>
        { user && (
            <div className='profile '>
            <div className="profile__cointainer _container">
                <div className="profile__photo">
                    <ProfileIcon/>
                    <button>
                        <Link to='/'>Go home</Link>
                    </button>

                    {user.user.role === 'ADMIN' && (
                        <button style={{background:'red'}}>
                            <Link to='/admin'>Go to admin dashboard</Link>
                        </button>
                        
                    )}
                </div>
                <div className="profile__info">
                    <div className="profile__id">Id: <span>{user.user._id}</span></div>
                    <div className="profile__name">Username: <span>{user.user.name}</span></div>
                    <div className="profile__email">Email: <span>{user.user.email}</span></div>
                    {user.user.role}
                </div>
            </div>
            <div className='purchase'>
                <div className='purchase__container'>
                    Users purchase
                </div>
            </div>
            </div>
            )}
            {!user && (
                <div style={{}}>No user data</div>
            )}
        </div>
    )
  }
  