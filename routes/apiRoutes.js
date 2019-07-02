const db = require('../models');
const reset = "\x1b[0m";
const cyan = "\x1b[36m";

module.exports = function (app) {
  // Get all examples
  app.get("/api/user", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new user
  app.post("/api/user", function (req, res) {
    console.log(`${cyan}about to call db.User.create...${reset}`)
    db.User.create(req.body).then(function (dbUsers) {
      console.log('dbUsers:', dbUsers)

      console.log(`${cyan}==> Created A New User - ${req.body.Username}${reset}`)
      res.json(dbUsers);
    });
  });

  //test api
  app.post("/api/este", (req, res) => {
    console.log(req.body);
    res.send("I see you, buu!");
  })

};
