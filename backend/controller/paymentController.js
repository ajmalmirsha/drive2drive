
const stripe = require("stripe")
  const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {

    // create payment intent

    async createPaymentIntent (req, res, next)  {
        try {
          const amount = parseInt(req.body?.amount)
          const paymentIntent = await Stripe.paymentIntents.create({
            currency: "Inr",
            amount: amount * 100,
            automatic_payment_methods: { enabled: true },
          });
      
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
        } catch (e) {
         next()
        }
      },

      // config payment
      
     config (req, res) {
        res.send({
          publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
      }
}