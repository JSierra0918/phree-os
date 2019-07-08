const db = require("../models");

module.exports = function(app) {
  // Load index page

 
  // app.get("/", function(req, res) {
  //   db.User.findAll({}).then(function(dbUsers) {
  //       console.log(res.json(dbUsers));
  //   //   res.render("index");
  //       res.json(dbUsers);
  //   });
  // });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};