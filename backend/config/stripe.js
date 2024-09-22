
const Stripe = require('stripe');
require('dotenv').config();
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY); // This should log your secret key

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = stripe;
