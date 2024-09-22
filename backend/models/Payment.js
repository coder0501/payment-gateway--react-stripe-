const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  stripePaymentIntentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Payment', paymentSchema);
