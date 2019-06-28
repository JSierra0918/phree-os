require("dotenv").config();
const express = require("express");
const app = express();
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
let PORT = process.env.PORT || 3001;
const path = require("path");
const models = require("./models");

// Define middleware here  ================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Morgan
app.use(logger("dev"));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// END Define middleware here  ================================================================

// API ROUTES =============================
// require("./Routes/API")(app);
var authRoute = require('./routes/auth.js')(app, passport);
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes")(app);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

// **************** NOT TOO SURE **********************
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

  // if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// If running a test, set syncOptions.force to true
// clearing the `testdb`
var syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
  }
  
  // Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
    console.log("\nnice database, bro\n")
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });