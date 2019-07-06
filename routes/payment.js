const config = require('../config/stripe/stripeKey');
const stripe = require('stripe')(config.stripe_secret_key);


module.exports = (app) => {

    app.post('/api/stripe/account/get', function (req, res, next) {
      const stripeAccountId = null;

      //stripeAccountID is the variable that will store the ID that is in the db
      //assosciated with whatever user is logged in 

      if(!stripeAccountId) {
        res.send({
          sucess: true,
          message: 'Missing stripe account.',
          setupBegan: false,
        })
      } else {
        res.send({
        sucess: true,
        message: 'Stripe Account.',
        setupBegan: true,
        })
      }
    })

    //begin stripe connect setup
    app.post('/api/stripe/account/setup', function (req, res, next) {
      const country = req.body.countryCode;
      const email = 'adammravitz@gmail.com'
      
      if (country !== 'CA' && country !== 'US') {
        res.send ({
          sucess: false,
          message: 'Error: Invalid country', 
        })
      } else {
          stripe.accounts.create({
            type: 'custom',
            country, 
            email,
          }, function(err, account) {
            if (err) {
            res.send({
              success: false,
              message: `Error: ${err.message}`,

            }); 
          } else {
              console.log('account', account);

              const {id} = account

              stripe.accounts.update(
                id,
                {
                  tos_acceptance: {
                    date: Math.floor(Date.now() / 1000),
                    // ip: req.ip,
                    ip: request.connection.remoteAddress
                  }
                },then(() => {
                  res.send({
                    success: true,
                    messagE: 'Account setup has begun.',
                    //at this point we would be saving the id into our database 
                    accountId: id,
                  })
                })
              )
          }
        })
      }
      //const email will be the email address entered in the database
    })



    // app.post("/charge", async (req, res) => {
    //     try {
    //       let {status} = await stripe.charges.create({
    //         amount: 2000,
    //         currency: "usd",
    //         description: "An example charge",
    //         source: req.body
    //       });
      
    //       res.json({status});
    //     } catch (err) {
    //       res.status(500).end();
    //     }
    //   });

}
