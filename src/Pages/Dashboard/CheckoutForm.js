import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({appointment}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const {_id, price, patient, patientName}=appointment;
  
  useEffect(()=>{
    fetch('http://localhost:5000/create-payment-intent',{
        method: 'POST',
        headers:{
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify({price})
    })
    .then(res=>res.json())
    .then(data=>{
        if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
        }
    })
},[price])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    // if (error) {
    //   setCardError(error.message);
    //   console.log("[error]", error);
    // } else {
    //   console.log("[PaymentMethod]", paymentMethod);
    //   setCardError('');
    // }
    setCardError(error?.message || '');
    setSuccess('');
    setProcessing(true);
    //confirm card payment
    const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: patientName,
              email: patient,
            },
          },
        },
      );
      if (intentError) {
        setCardError(intentError?.message);
        setSuccess('');
        setProcessing(false);
      }else{
        setCardError('');
        setTransactionId(paymentIntent.id);
        console.log(paymentIntent);
        setSuccess('Congrats! Your payment is completed.');
        //store payment on db
        const payment = {
            appointment: _id,
            transactionId: paymentIntent.id
        }
        fetch(`http://localhost:5000/booking/${_id}`,{
            method: "PATCH",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payment)
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setProcessing(false);
        })
      }
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-success btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || success}>
        Pay
      </button>
    </form>
    {cardError && <p className="text-red-500">{cardError}</p>}
    {success && <div className="text-success">
        <p>{success}</p>
        <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span></p>
        </div>}
    </>
  );
};

export default CheckoutForm;
