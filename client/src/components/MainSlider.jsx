import React from "react";
import { Carousel } from "react-bootstrap";
import CallUsFromSliders from "./CallUsFromSliders";

function MainSlider({ images }) {
  if (!images) {
    images = [
      {
        id:'1',
        title: "ЛЕТНЕЕ КАТАНИЕ ЕЩЕ АКТУАЛЬНО",
        tagline: "думаешь лето - не сезон катания?",
        src: "./src/assets/MainSliderImages/riv05151_powder_skiing-min1.png",
      },
      {
        id:'2',
        title: "ОТКРЫТИЕ ЛЕТНЕГО СЕЗОНА",
        tagline: "у нас наступил летний сезон",
        src: "./src/assets/MainSliderImages/riv05151_powder_skiing-min2.png",
      },
      {
        id:'3',
        title: "СКИДКИ НА ПРОКАТ",
        tagline: "в честь открытия сезона",
        src: "./src/assets/MainSliderImages/3.5_homepage_hero.jpg",
      },
    ];
  }

  

  return (
    <Carousel
      className="mt-3 position-relative"
      controls={false}
      interval={6000}
    >
      {images.map((slider) => (
        <Carousel.Item key={slider.id} style={{ transition: "all 0.5s ease-in-out" }}>
          <img className="d-block w-100 image" src={slider.src} alt="First slide" />
          <CallUsFromSliders />
          <Carousel.Caption
            style={{
              left: "10%",
              right: "60%",
              textAlign: "left",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <h3 className="size80" style={{ fontFamily: "Standart CT" }}>
              {slider.title}
            </h3>
            <p className="display-0.5 opacity-75">{slider.tagline}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MainSlider;
