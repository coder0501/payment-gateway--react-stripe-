import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Payment = ({ paymentDetails }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    // Simulate payment processing delay
    setTimeout(() => {
      setLoading(false);
      const isPaymentSuccessful = Math.random() > 0.2; // Simulate success 80% of the time

      if (isPaymentSuccessful) {
        setSuccess(true);
        console.log('Payment successful for:', paymentDetails);
      } else {
        setError('Payment failed. Please try again.');
      }
    }, 3000); // 3-second delay
  };

  return (
    <div className="payment-confirmation">
      <h2>Confirm Your Payment</h2>
      {error && <p className="error-message">{error}</p>}
      
      {loading ? (
        <LoadingSpinner />  
      ) : (
        <button onClick={handlePayment} className="confirm-button" disabled={loading}>
          Confirm Payment
        </button>
      )}
      
      {success && <p className="success-message">Payment Successful!</p>}
    </div>
  );
};

export default Payment;
