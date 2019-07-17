require("dotenv").config();
const express = require("express");
const app = express();
const passport = require('passport')
const session = require('express-session')
// const bodyParser = require('body-parser')
const logger = require('morgan')
let PORT = process.env.PORT || 3001;
console.log(PORT)
const path = require("path");
const models = require("./models");
// var flash = require('connect-flash');
const url = require('url');


//stupid colors
const reset = "\x1b[0m";
const cyan = "\x1b[36m";
const yellow = "\x1b[33m";

//Morgan
app.use(logger("dev"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash());

//Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// END Define middleware here  ================================================================

// API ROUTES =============================
require('./routes/auth.js')(app, passport);
require("./routes/apiRoutes.js")(app);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

app.get('*', (req, res) => {
  if (process.env.NODE_ENV === "production") {
   return res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  } 
  const parsedURL = url.parse(req.url, true)
   
  res.redirect(`localhost:3000${parsedURL.href}`)
})

// If running a test, set syncOptions.force to true
// clearing the `testdb`
var syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
  }
  
  // Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
    console.log(`\n${yellow}database is working${reset}\n`)
    app.listen(PORT, function() {
      console.log(
        `==> 🌎  Listening on port %s. \nVisit http://localhost:%s/ in your browser for json \n ${yellow}or ${reset} \nVisit http://localhost:3000/ for our React.js app.`,
        PORT,
        PORT
      );
    });
  });