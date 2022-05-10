import React from "react";
import appointment from "../../assets/images/appointment.png";
import doctor from '../../assets/images/doctor-small.png'
import PrimaryButton from "../Shared/PrimaryButton";

const MakeAppointment = () => {
  return (
    <section
      style={{
        background: `url(${appointment})`,
      }}
      className="flex justify-center items-center"
    >
      <div className="flex-1 hidden md:block">
          <img className="mt-[-120px]" src={doctor} alt="doctor" />
      </div>
      <div className="flex-1 px-3 md:px-12">
          <h3 className="text-primary text-xl font-bold my-3">Appointment</h3>
          <h1 className="text-white text-3xl my-3">Make an appointment Today</h1>
          <p className="text-white my-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
          <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </section>
  );
};

export default MakeAppointment;
