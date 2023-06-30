import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { userApi } from "../../../utils/Apis";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";

export default function CheckoutForm({bookingId,setBookings,couponId}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { userAuthenticationHandler } = useErrorHandler()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
      },
      redirect: 'if_required'
    });

    console.log(response,89);

    if (response.error?.type === "card_error" || response.error?.type === "validation_error") {
      setMessage(response.error.message);
    } else if (!response.error) {
      setMessage(`Payment Succeeded`);
      userApi.patch('/payment-success',{paymentId:response.paymentIntent.id,bookingId,paymentMethod:response.paymentIntent.payment_method_types[0],couponId}).then(({data:{data}}) => {
        setBookings(data)
      }).catch( err => {
         userAuthenticationHandler(err)
      })
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <div className="d-flex justify-content-center">
      <button class="btn btn-outline-success mt-3 " disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
