import React, { useState } from 'react';
import Payment from './Payment';

const Checkout = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    email: '',
    amount: '',
  });

  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPaymentInitiated(true);
  };

  return (
    <div className="checkout-container">
      {!isPaymentInitiated ? (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Enter Payment Details</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={paymentDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={paymentDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={paymentDetails.amount}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="checkout-button">Proceed to Payment</button>
        </form>
      ) : (
        <Payment paymentDetails={paymentDetails} />
      )}
    </div>
  );
};

export default Checkout;
