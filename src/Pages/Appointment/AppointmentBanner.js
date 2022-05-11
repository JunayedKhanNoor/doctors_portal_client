import React, { useState } from "react";
import chair from "../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const AppointmentBanner = () => {
    const [date, setDate] = useState(new Date());
  return (
    <div className="hero min-h-screen bg-[url('/src/assets/images/bg.png')]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="sm:w-full md:max-w-sm lg:max-w-md rounded-lg shadow-2xl" alt="" />
        <div>
          <DayPicker 
          mode="single"
          selected={date}
          onSelect={setDate}
          />
           <p className="pl-6">You picked {format(date, 'PP')}.</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
