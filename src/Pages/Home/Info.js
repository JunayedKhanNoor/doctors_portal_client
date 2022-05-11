import React from "react";
import InfoCard from "./InfoCard";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";

const Info = () => {
  const info1 = {
    title: "Opening Hours",
    text: "From 8:00 am to 11:00 pm 7 day in a week.",
    img: clock,
    bgClass: `bg-gradient-to-r from-secondary to-primary`,
  };
  const info2 = {
    title: "Visit our location",
    text: "Brooklyn, NY 10036, United States.",
    img: marker,
    bgClass: "bg-[#3d4451]",
  };
  const info3 = {
    title: "Contact us now",
    text: "+000 123 456789",
    img: phone,
    bgClass: `bg-gradient-to-r from-secondary to-primary`,
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <InfoCard info={info1} img={clock}></InfoCard>
      <InfoCard info={info2} img={marker}></InfoCard>
      <InfoCard info={info3} img={phone}></InfoCard>
    </div>
  );
};

export default Info;
