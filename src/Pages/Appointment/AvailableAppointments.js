import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { DateContext } from "./Appointment";
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointments = () => {
  const [date] = useContext(DateContext);
  //const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const formattedDate = format(date, "PP");
  // const res = await fetch(`http://localhost:5000/available?date=${formattedDate}`);
  //     const data =  await res.json();  
  //     console.log(data);
  //     return data 

  const { data: services, isLoading, refetch } = useQuery(["available", formattedDate], () =>
    fetch(`http://localhost:5000/available?date=${formattedDate}`).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  // useEffect(() => {
  //   fetch(`http://localhost:5000/available?date=${formattedDate}`)
  //     .then((res) => res.json())
  //     .then((data) => setServices(data));
  // }, [formattedDate]);
  return (
    <div>
      <p className="text-center text-secondary text-xl mt-12">
        Available Appointments on {format(date, "PP")}.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-12">
        {services.map((service) => (
          <Service key={service._id} service={service} setTreatment={setTreatment}></Service>
        ))}
      </div>
      {treatment && (
        <BookingModal refetch={refetch} treatment={treatment} setTreatment={setTreatment} date={date}></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointments;
