import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment({props,bookingId,setBookings,couponId}) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    console.log(props,897);
    fetch(`${process.env.REACT_APP_URL}/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    console.log(props);
 fetch(`${process.env.REACT_APP_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({amount:props}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      console.log(clientSecret,'kjhuk');
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm bookingId={bookingId} setBookings={setBookings} couponId={couponId}  />
        </Elements>
      )}
    </>
  );
}

export default Payment;
