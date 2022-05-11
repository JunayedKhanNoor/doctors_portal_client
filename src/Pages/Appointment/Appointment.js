import React, { createContext, useState } from "react";
import Footer from "../Shared/Footer";
import AppointmentBanner from "./AppointmentBanner";
import AvailableAppointments from "./AvailableAppointments";

export const DateContext = createContext("Date");

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  return (
    <DateContext.Provider value={[date, setDate]}>
      <div>
        <AppointmentBanner></AppointmentBanner>
        <AvailableAppointments></AvailableAppointments>
        <Footer></Footer>
      </div>
    </DateContext.Provider>
  );
};

export default Appointment;
