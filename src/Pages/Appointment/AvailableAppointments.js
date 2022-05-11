import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { DateContext } from "./Appointment";
import Service from "./Service";

const AvailableAppointments = () => {
  const [date] = useContext(DateContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div>
      <p className="text-center text-secondary text-xl mt-12">
        Available Appointments on {format(date, "PP")}.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-12">
          {
              services.map(service=>(
                  <Service key={service._id} service={service}></Service>
              ))
          }
      </div>
    </div>
  );
};

export default AvailableAppointments;
