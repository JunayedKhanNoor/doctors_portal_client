import React from "react";
import fluoride from "../../assets/images/fluoride.png";
import cavity from "../../assets/images/cavity.png";
import whitening from "../../assets/images/whitening.png";
import Service from "./Service";

const Services = () => {
  const services = [
    {
      _id: 1,
      name: "Fluoride Treatment",
      description: "Fluoride is a natural mineral that builds strong teeth and prevents cavities.",
      img: fluoride,
    },
    {
      _id: 2,
      name: "Cavity Filling",
      description:
        "A cavity filling is when the dentist fills the opening in your tooth with some kind of material. ",
      img: cavity,
    },
    {
      _id: 3,
      name: "Teeth Whitening",
      description:
        "According to the FDA, the term bleaching is permitted when the teeth can be whitened beyond their natural color.",
      img: whitening,
    },
  ];
  return (
    <div className="mt-28">
      <div className="text-center">
        <h1 className="uppercase text-xl font-bold text-primary">Our Services</h1>
        <h1 className="text-4xl">Service We Provide</h1>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {
              services.map(service =><Service
              key={service._id}
              service={service}
              ></Service>)
          }
      </div>
    </div>
  );
};

export default Services;
