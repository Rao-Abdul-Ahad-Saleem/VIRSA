// import Stripe from "stripe";
// import dotenv from "dotenv";

// dotenv.config();

// // paste private key here
// export const stripe = new Stripe("sk_test_51PxpXdHK2vbEMYwFpqiK283vyLNkqXjblNVlBCOteWShxnr0FdrOQm110BieqJcE7QlvtOIOWRDXop0tQXwC44gJ00iYdHkxu9");
// // export const stripe = new Stripe("sk_test_51PxpZ5P8kMJ8cLP1i2Mz7Qt1vf3vD4FO8C9tykwVmZc6XDODV4JDhxha9cyjbCBgbVUTCpUeljoGDApf5wCoUiN300DMSPyqXk");


import Stripe from 'stripe';

export const stripe = new Stripe(process.env.stripe_secret_key);