import {Routes, Route} from 'react-router-dom';

import { Home } from '../pages/Home.page';

export const App = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  )
}; 
