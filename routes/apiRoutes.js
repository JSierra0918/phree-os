const db = require("../models");
var request = require("request");
const config = require("../config/stripe/stripeKey");
const reset = "\x1b[0m";
const cyan = "\x1b[36m";
var request = require("request");
const stripe = require("stripe")(config.stripe_secret_key);

module.exports = function(app) {
  // Get all examples
  app.get("/api/user/:id", function(req, res) {
    const idInput = req.params.id;
    db.User.findOne({
      where: {
        id: idInput
      }
    }).then(function(user) {
      res.json(user);
    });
  });

  app.get("/api/category/:id", function(req, res) {
    const idInput = req.params.id;
    db.Category.findAll({
      where: {
        UserId: idInput
      }
    }).then(function(categories) {
      res.json(categories);
    });
  });

  //display category selected
  app.get("/api/category/one/:id", function(req, res) {
    const idInput = req.params.id;
    db.Category.findOne({
      where: {
        id: idInput
      }
    }).then(function(categories) {
      res.json(categories);
    });
  });

  //get item based off of category ID
  app.get("/api/items/:id", function(req, res) {
    const idInput = req.params.id;
    db.Item.findAll({
      where: {
        CategoryID: idInput
      }
    }).then(function(items) {
      res.json(items);
    });
  });

  //grab specific Items
  app.get("/api/items/one/:id", function(req, res) {
    const idInput = req.params.id;
    db.Item.findOne({
      where: {
        id: idInput
      }
    }).then(function(items) {
      res.json(items);
    });
  });

  // Create a new user
  app.post("/api/user", function(req, res) {
    console.log(`${cyan}about to call db.User.create...${reset}`);
    db.User.create(req.body).then(function(dbUsers) {
      console.log("dbUsers:", dbUsers);

      console.log(
        `${cyan}==> Created A New User - ${req.body.Username}${reset}`
      );
      res.json(dbUsers);
    });
  });

  // Create a a summary
  app.post("/api/summary/:id", (req, res) => {
    const idInput = req.params.id;
    console.log(req.body);
    res.json(req.body);
  });

  // Update items after the client has sold.
  app.put("/api/items/one/:id", function(req, res) {
    const idInput = req.params.id;
    console.log("req.body:", req.body);
    //subtract the items quantity by the req.body
    // subtract
    let updatedQuantity = -req.body.Quantity;
    db.Item.update(
      {
        quantity: req.body.Quantity
      },
      {
        where: {
          id: idInput
        }
      }
    ).then(function(updatedItem) {
      res.json(updatedItem);
    });
  });

  // Create a category
  app.post("/api/category/one/:id", (req, res) => {
    console.log(req.body);
    db.Category.create(req.body)
      .then(catResponse => {
        console.log("catResponse:", catResponse);
        res.json(catResponse);
      })
      .catch(err => console.log(err));
  });

  //update category
  app.put("/api/category/:id", function(req, res) {
    const idInput = req.params.id;
    //subtract the items quantity by the req.body
    // subtract
    let updatedCat = req.body.categoryName;
    console.log(idInput, updatedCat);
    db.Category.update(
      {
        categoryName: updatedCat
      },
      {
        returning: true,
        where: {
          id: idInput
        }
      }
    )
      .then(function(catResult) {
        //  console.log('categoryName:', categoryName)
        res.json(catResult);
      })
      .catch(err => console.log(err));
  });

  app.delete("/api/category/:id", function(req, res) {
    const idInput = req.params.id;
    console.log("DELETE:", idInput);
    db.Category.destroy({
      where: {
        id: idInput
      }
    })
      .then(deleteResponse => {
        console.log("deleteResponse:", deleteResponse);
        db.Item.destroy({
          where: {
            CategoryID: idInput
          }
        }).then(response => res.json(response));
      })
      .catch(err => console.log(err));
  });

  app.post("/api/stripe", function(req, res) {
    console.log("in stripe api call");
    console.log("req.body.userId: ", req.body.userId);
    request.post(
      {
        url: "https://connect.stripe.com/oauth/token",
        form: {
          client_secret: config.stripe_secret_key,
          code: req.body.code,
          grant_type: "authorization_code"
        }
      },
      function(error, response, body) {
        console.log("error:", error);

        if (!error && response.statusCode == 200) {
          console.log("it went ok");
          console.log(body);
          var bodyParsed = JSON.parse(body);
          db.Stripe.create({
            StripeUserId: bodyParsed.stripe_user_id,
            StripeRefreshToken: bodyParsed.refresh_token,
            UserId: req.body.userId
          })
            .then(function(stripe) {
              console.log(stripe);
            })
            .then(function() {
              db.User.update(
                {
                  hasStripe: true
                },
                {
                  where: {
                    id: req.body.userId
                  }
                }
              )
                .then(function(updatedItem) {
                  res.json(updatedItem)
                })
                .catch(err => console.log(err));
            });
        }
      }
    );
  });

  app.get("/api/stripe/:id", function(req, res) {
    // console.log('in api/stripe get')
    // console.log(req.params.id)
    db.Stripe.findOne({
      where: {
        UserId: req.params.id
      }
    }).then(function(stripeAccountInfo) {
      // console.log('results from get.api/stripe')
      // console.log(res)
      res.json(stripeAccountInfo);
    });
  });

  //create new Item
  // Update items after the client has sold.
  app.put("/api/items/:id", function(req, res) {
    const idInput = req.params.id;
    console.log("req.body:", req.body);
    //subtract the items quantity by the req.body
    // subtract

    let newItem = req.body;
    console.log("newItem:", newItem);
    db.Item.update(
      {
        itemname: req.body.itemname,
        price: req.body.price,
        quantity: req.body.quantity,
        counter: req.body.counter,
        CategoryID: req.body.CategoryID
      },
      {
        returning: true,
        where: {
          id: idInput
        }
      }
    ).then(function(updatedItem) {
      console.log("updatedItem:", updatedItem);
      res.json(updatedItem);
    });
  });

  //makes the charges, updates the quantities 
  app.post("/charge", function(req, res) {
    console.log(`${cyan}this is the request.body${reset}`);
    var body = req.body;
    var token = body.token;
    var total = body.total;
    var userId = body.userId;
    db.Stripe.findOne({
      where: {
        userId: userId
      }
    }).then(function(results) {
      var stripeUserId = results.dataValues.StripeUserId;

      stripe.charges
        .create(
          {
            amount: parseInt(
              total
                .toString()
                .split(".")
                .join("")
            ),
            currency: "usd",
            source: token
          },
          {
            stripe_account: stripeUserId
          }
        )
        .then(function(charge) {
          res.sendStatus(200);
        })
        // .catch((err) => console.log(err))
        .then(function(updatingQty) {
          const updateInfo = body.checkoutObj;
          console.log("updateInfo:");
          console.log(updateInfo);

          for (var i = 0, p = Promise.resolve(); i < updateInfo.length; i++) {
            console.log('updateInfo before set time out :', updateInfo)
            let quantity = updateInfo[i].quantity
            let id = updateInfo[i].id
            
            console.log('p:', p)
            p = p.then(
              yellow =>
              new Promise(resolve =>
                setTimeout(function() {
                  console.log('updateInfo after set time out :', updateInfo)
                    console.log('i',i);
                    db.Item.update(
                      {
                        quantity: quantity
                      },
                      {
                        where: {
                          id:id
                        }
                      }
                    )
                      .then(function(results) {
                        console.log(
                          `${cyan}results from the item update ${reset}`
                        );
                        console.log(results);
                      })
                      .catch(err => console.log(err));

                    resolve();
                  }, i * 500)
                )
            );
          }
        });
    });
  });

  app.delete("/api/items/:id", function(req, res) {
    const idInput = req.params.id;
    console.log("idInput:", idInput);
    db.Item.destroy({
      where: {
        id: idInput
      }
    })
      .then(response => res.json(response))
      .catch(err => console.log(err));
  });

  // Create a items
  app.post("/api/items/one/:id", (req, res) => {
    const idInput = req.params.id;
    console.log("CategoryID:", req.body.CategoryID);
    db.Item.create(req.body)
      .then(itemResponse => {
        console.log("itemResponse:", itemResponse);
        db.Item.findAll({
          where: {
            CategoryID: idInput
          }
        }).then(response => {
          console.log("response:", response);
          res.json(response);
        });
        //
      })
      .catch(err => console.log(err));
  });
};
