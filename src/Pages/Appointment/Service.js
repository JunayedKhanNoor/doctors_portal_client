import React from "react";
import PrimaryButton from "../Shared/PrimaryButton";

const Service = ({ service, setTreatment }) => {
  const { name, slots } = service;
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary">{name}</h2>
        <p>
          {slots.length ? (
            <span>{slots[0]}</span>
          ) : (
            <span className="text-red-500 uppercase">Try another day</span>
          )}
        </p>
        <p className="uppercase">
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <div className="card-actions">
         {/*  <button
            className="btn btn-primary text-white bg-gradient-to-r from-secondary to-primary"
            onClick={() => setTreatment(service)}
            disabled={!slots.length}
          >
            Book Appointment
          </button> */}
          <label
            htmlFor="booking-modal-6"
            className="btn btn-primary text-white bg-gradient-to-r from-secondary to-primary"
            onClick={() => setTreatment(service)}
            disabled={!slots.length}
          >
             Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default Service;
