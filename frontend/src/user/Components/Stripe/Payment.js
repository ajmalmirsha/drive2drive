import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { userApi } from "../../../utils/Apis";

function Payment({ props, bookingId, setBookings, couponId }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    userApi.get(`/config`).then((r) => {
      const { publishableKey } = r.data;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    userApi.post(`/create-payment-intent`, {
      headers: {
        "Content-Type": "application/json"
      },
      amount: props,
    }).then((result) => {
      var { clientSecret } = result.data;
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm bookingId={bookingId} setBookings={setBookings} couponId={couponId} />
        </Elements>
      )}
    </>
  );
}

export default Payment;
