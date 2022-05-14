import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from 'react-toastify';

const BookingModal = ({ treatment, setTreatment, date, refetch  }) => {
  const { _id, name, slots } = treatment;
  const [user, loading] = useAuthState(auth);
  const formattedDate = format(date, "PP");
  const handleBooking = (e) => {
    e.preventDefault();
    const slot = e.target.slot.value;
    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formattedDate,
      slot,
      patient: user.email,
      patientName: user.displayName,
      phone: e.target.phone.value,
    };
    fetch("http://localhost:5000/booking", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(booking);
        if (data.success) {
          toast.success(`Appointment is set, ${formattedDate} at ${slot}`);
        }else{
          toast.error(`Already have an appointment on ${data.booking?.date} at ${data.booking?.slot}`);
        }
        //close modal
        refetch();
        setTreatment(null);
      });
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label htmlFor="booking-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="font-bold text-lg">{name}</h3>
          <form
            className="grid grid-cols-1 justify-items-center gap-3 mt-3"
            onSubmit={handleBooking}
          >
            <input
              type="text"
              disabled
              value={format(date, "PP")}
              className="input input-bordered w-full md:max-w-md"
            />
            <select name="slot" className="select select-bordered w-full md:max-w-md">
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              disabled
              value={user?.displayName || ""}
              placeholder="Your Name"
              className="input input-bordered w-full md:max-w-md"
            />
            <input
              type="email"
              name="email"
              disabled
              value={user?.email || ""}
              placeholder="Email Address"
              className="input input-bordered w-full md:max-w-md"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              className="input input-bordered w-full md:max-w-md"
            />
            <input type="submit" value="Submit" className="btn btn-neutral w-full md:max-w-md" />
          </form>
          {/*  <div className="modal-action">
            <label htmlFor="booking-modal-6" className="btn">
              Yay!
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
