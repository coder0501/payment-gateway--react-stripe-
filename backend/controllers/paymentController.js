const stripe = require('../config/stripe');
const Payment = require('../models/Payment');

// Customer Initiates Payment
exports.createPaymentIntent = async (req, res) => {
    console.log("createPaymentIntent");
  const { amount, email } = req.body;
 

  try {
    // Payment Information Collection and Encryption
    console.log(amount)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: email,
    });

    console.log(paymentIntent);

    // Save payment record in MongoDB
    const payment = new Payment({
      customerEmail: email,
      amount,
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending',
    });

    console.log(payment);

    await payment.save();

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Payment Failed', error });
  }
};

// Payment Authorization and Processing
exports.paymentSuccess = async (req, res) => {
  const { paymentIntentId } = req.body;
  try {
    const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntentId });
    if (!payment) return res.status(404).json({ message: "Payment Not Found" });

    payment.status = 'completed';
    await payment.save();

    res.status(200).json({ message: "Payment Successful" });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment status', error });
  }
};
