import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { DateContext } from "./Appointment";
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointments = () => {
  const [date] = useContext(DateContext);
  const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);

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
                  <Service key={service._id} service={service} setTreatment={setTreatment}></Service>
              ))
          }
      </div>
      {
          treatment && <BookingModal treatment={treatment}></BookingModal>
      }
    </div>
  );
};

export default AvailableAppointments;
