const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
  });

module.exports = {

    // create payment intent

    async createPaymentIntent (req, res)  {
        try {
          const paymentIntent = await Stripe.paymentIntents.create({
            currency: "Inr",
            amount: req.body.amount * 100,
            automatic_payment_methods: { enabled: true },
          });
      
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
        } catch (e) {
          return res.status(400).send({
            error: {
              message: e.message,
            },
          });
        }
      },

      // config payment
      
     config (req, res) {
        res.send({
          publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
      }
}