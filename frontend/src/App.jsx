import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

console.log("Stripe Public Key:", import.meta.env.VITE_STRIPE_PUBLIC_KEY); // Should print the key

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <CheckoutForm />
      </div>
    </Elements>
  );
}

export default App;




