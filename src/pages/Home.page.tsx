import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Header from "../components/header/Header";
import { Suspense } from "react";
import Preloader from "../components/Preloader/Preloader";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <Suspense fallback={<Preloader/>}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
