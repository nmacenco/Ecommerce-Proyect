import React from "react";
import { HomeContainer } from "./HomeStyles";
import img2 from "../../images/carrusel2.jpg";
import img3 from "../../images/carrusel3.jpg";

const Home = (): JSX.Element => {
  return (
    <div className="d-flex flex-column ">
      <HomeContainer
        id="carouselExampleCaptions"
        className="carousel slide container-sm"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="4000">
            <img
              src="https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/wallpapers/rtx-3080/3080-wallpaper-2560x1440-r1.png"
              className="d-block w-100"
              alt="..."
            ></img>
            <div className="carousel-caption d-none d-md-block">
              <h3 className=" text-white">GEFORCE RTX™ 3080 Ti</h3>
              <h5 className=" text-white">
                Find the latest graphic boards on the market.
              </h5>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img src={img2} className="d-block w-100" alt="..."></img>
            <div className="carousel-caption d-none d-md-block text-white">
              <h3 className=" text-white">Logitech G305 Lightspeed Wireless</h3>
              <h5 className=" text-white">
                The best mouses for FPS games.
              </h5>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img src={img3} className="d-block w-100" alt="..."></img>
            <div className="carousel-caption d-none d-md-block text-white">
              <h4 className=" text-white">Everything you need for your gamer setup.</h4>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </HomeContainer>
    </div>
  );
};

export default Home;
