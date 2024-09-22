const express = require('express');
const { createPaymentIntent, paymentSuccess } = require('../controllers/paymentController');
const router = express.Router();

// Initiate payment
router.post('/create-payment-intent', createPaymentIntent);

// Confirm successful payment
router.post('/payment-success', paymentSuccess);

module.exports = router;



