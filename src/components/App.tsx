import {Routes, Route} from 'react-router-dom';

import { Home } from '../pages/Home.page';
import { ProfilePpage } from '../pages/Profile.page';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { AdminPage } from '../pages/Admin.page';
import { SingUp } from './SingUp/SingUp';
import { LogIn } from './Login/Login';

export const App = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfilePpage/>}/>
      </Route>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/register' element={<SingUp/>}/>
      <Route path='/login' element={<LogIn/>}/>
    </Routes>
    </>
  )
}; 
