import Aside from "../Aside/Aside";
import Laptops from "../Laptops/Laptops";

import "./Hero.scss";

const Hero = () => {
  return (
    <main className="main">
      <div className="main__wrapper _container">
        <Aside />
        <Laptops />
      </div>
    </main>
  );
};

export default Hero;
