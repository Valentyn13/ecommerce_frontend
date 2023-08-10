import {Routes, Route} from 'react-router-dom';

import { Home } from '../pages/Home.page';
import { ProfilePpage } from '../pages/Profile.page';

export const App = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/profile' element={<ProfilePpage/>}/>
    </Routes>
    </>
  )
}; 
