const _ = require('lodash');
const assign = require('assign-deep')
const config = require('../config/stripe/stripeKey');
const stripe = require('stripe')(config.stripe_secret_key);


module.exports = (app) => {

    function nestObj(keys, val) {
      var o = {}, k = keys.split('.')
      return k.reduce((r, e, i) => r[e] || (r[e] = (k.length-1 != i) ? {} : val), o), o
    }

    app.post('/api/stripe/account/get', function (req, res, next) {
      const stripeAccountId = null;

      //stripeAccountID is the variable that will store the ID that is in the db
      //assosciated with whatever user is logged in 


      //if there is no stripe account
      if(!stripeAccountId) {
        res.send({
          sucess: true,
          message: 'Missing stripe account.',
          setupBegan: false,
          account: null,

        })
      } else {
        //if there is a stripe account 
        stripe.accounts.retrieve(
          stripeAccountId,
          (err, account) => {
              if (err) {
                  res.send({
                    success: false,
                    message: `Error: ${err.message}` 
                  })
              } else {
                res.send({
                  success: true,
                  message: 'Stripe account.',
                  setupBegan: true,
                  account: account,
                })
              }
          }
        );
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
                    ip: req.ip,
                    // ip: request.connection.remoteAddress
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

    //save stripe info
    app.post('/api/stripe/account/save', function (req, res, next) {

      const stripeAccountId = ''
      //get the id from our server or database

      if(!stripeAccountId) {
        res.send({
          success: true,
          message: 'Missing stripe account.',
          setupBegan: false,
          account: null,
        });
      } else {
        let i = 0
        let stdripeObj = {}
        //loop through the body elements 
        _.forEach(req.body, (value, key) => {
          //generate a new object based on the dot notation 
          const obj = nestObj(key, value); 
          stripeObj = assign(stripeObj, obj)

          i += 1;
            
          //IF its on the very last element it updates the stripe.accounts
          if (1 === Object.keys(req.body).length) {
              console.log('end', stripeObj);

              stripe.accounts.update(
                stripeACcountId,
                stripeObj
              ).then(() => {
                res.send({
                  success: true,
                  message: 'Saved',
                });
              }, (err) => {
                console.log('err', err)
                return res.send({
                  success: false,
                  message: 'error',
              });
            });
          } //end of i === object.length
        })
    }
  })
              
}




