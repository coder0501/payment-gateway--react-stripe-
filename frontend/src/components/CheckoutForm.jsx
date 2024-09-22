import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      // Customer Initiates Payment
      // console.log("inside handleSubmit:")
      const { data } = await axios.post(
        "http://localhost:5000/payments/create-payment-intent",
        { email, amount }
      );

      const { clientSecret } = data;
      const cardElement = elements.getElement(CardElement);
      console.log("Inside handleSubmit:", data, clientSecret);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );
      console.log("Stripe Secret Key:", error, paymentIntent); // This should log your secret key

      if (error) {
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        // Payment Successful
        await axios.post("http://localhost:5000/payments/payment-success", {
          paymentIntentId: paymentIntent.id,
        });
        setMessage("Payment successful!");
      }
    } catch (error) {
      setMessage("Error processing payment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      <div>{message}</div>
    </form>
  );
}

export default CheckoutForm;





