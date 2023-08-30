import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <div className="wrapper">
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Home;
