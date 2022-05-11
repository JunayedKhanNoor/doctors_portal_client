import React from "react";
import Banner from "./Banner";
import Contact from "./Contact";
import Footer from "../Shared/Footer";
import Info from "./Info";
import MakeAppointment from "./MakeAppointment";
import Services from "./Services";
import Testimonials from "./Testimonials";
import TreatmentBanner from "./TreatmentBanner";


const Home = () => {
  return (
    <div className="px-3 md:px-0">
      <Banner></Banner>
      <Info></Info>
      <Services></Services>
      <TreatmentBanner></TreatmentBanner>
      <MakeAppointment></MakeAppointment>
      <Testimonials></Testimonials>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
};

export default Home;
