import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51L0gkFEKZNzFvXocJB6WlcmNJgLNV2jvxnfYbaU9fpaL0c33gz96M8Na5HZmNz3ZNcmfcAU30fOHDYAZN58X072700YIyzSUVL');

const Payment = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/booking/${id}`;
  const { data: appointment, isLoading } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
          <div class="card w-full md:max-w-md bg-base-100 shadow-xl  my-12">
            <div class="card-body">
              <p className="text-success font-bold">Hello, {appointment.patientName}</p>
              <h2 class="card-title">Pay for: {appointment.treatment}</h2>
              <p>
                Your Appointment on <span className="text-orange-500">{appointment.date}</span> at{" "}
                {appointment.slot}
              </p>
              <p>Please pay: ${appointment.price}</p>
            </div>
          </div>
          <div class="card flex-shrink-0 w-full md:max-w-md shadow-2xl bg-base-100 my-12">
            <div class="card-body">
            <Elements stripe={stripePromise}>
                 <CheckoutForm />
            </Elements>
            </div>
          </div>
    </div>
  );
};

export default Payment;
