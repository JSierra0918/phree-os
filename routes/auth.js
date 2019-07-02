const authController = require('../controller/authcontroller');
const reset = "\x1b[0m";
const cyan = "\x1b[36m";
const yellow = "\x1b[33m";

module.exports = function(app, passport) {

    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);

    //signup calls the local-signup bit in passport.js, which calls db.User and creates the entry into it 
    app.post('/signup', 
    passport.authenticate('local-signup'),
      function(req, res) {
        // console.log('req:', req.user)
        var id = encodeURIComponent(req.user.id);
        var first = encodeURIComponent(req.user.firstname)
        var last = encodeURIComponent(req.user.lastname)
        var storeName = encodeURIComponent(req.user.storename)

        let userInfo = {
          id: id,
          firstNme: first,
          lastName: last,
          storeName: storeName
        }
        res.json(userInfo)    
     
        })
        
    app.get('/signedin', isLoggedIn, authController.quiz);

    app.get('/logout', authController.logout);

    app.post('/signin', 
    passport.authenticate('local-signin'), 
    function(req, res) {
      // console.log('req:', req.user)
      var id = encodeURIComponent(req.user.id);
      var first = encodeURIComponent(req.user.firstname)
      var last = encodeURIComponent(req.user.lastname)
      var storeName = encodeURIComponent(req.user.storename)

      let userInfo = {
        id: id,
        firstNme: first,
        lastName: last,
        storeName: storeName
      }
      res.json(userInfo)    
   
  })

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())            
            return next();

    }
}