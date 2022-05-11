import React, { useContext } from "react";
import chair from "../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { DateContext } from "./Appointment";

const AppointmentBanner = () => {
  const [date, setDate] = useContext(DateContext);
  return (
    <div className="hero min-h-screen bg-[url('/src/assets/images/bg.png')]">
      <div className="hero-content flex-col lg:flex-row-reverse md:gap-20">
        <img
          src={chair}
          className="sm:w-full md:max-w-sm lg:max-w-md rounded-lg shadow-2xl"
          alt=""
        />
        <div className="shadow-2xl rounded-lg">
          <DayPicker mode="single" selected={date} onSelect={setDate} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
