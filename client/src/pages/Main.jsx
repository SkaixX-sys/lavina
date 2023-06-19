import React from "react";
import MainSlider from "../components/MainSlider";
import StartFly from "../components/StartFly";
import LastThreeNews from "../components/LastThreeNews";
import ServiceList from "../components/ServiceList";

function Main() {
  return (
    <>
      <MainSlider/>
      <StartFly />
      <LastThreeNews />
      <ServiceList />
    </>
  );
}

export default Main;
