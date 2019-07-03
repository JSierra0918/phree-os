//load bcrypt
const bCrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const db = require('../../models');

module.exports = function(passport, user) {
    const User = db.User;
    var LocalStrategy = require('passport-local').Strategy;
    
        //serialize
        passport.serializeUser(function(user, done) {
            console.log("serialize user")
            done(null, user.id);        
        });
        // deserialize user 
        passport.deserializeUser(function(id, done) {
            User.findByPk(id).then(function(user) {
        
                if (user) {        
                    done(null, user.get());        
                } else {    
                    done(user.errors, null);                    
                }
            });
        });
 
    passport.use('local-signup', new LocalStrategy(
 
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
 
        },
 
        function(req, email, password, done) {
            // console.log('email:', email)
            // console.log('password:', password)
            console.log("-----in function for local-signup-----")
             var generateHash = function(password) {
                 return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
 
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
            console.log('user:', user)
 
                if (user) {
                    console.log("this email is already taken ")
                    return done(null, false, {
                        message: 'That email is already taken'
                    }); 
                } else {
                    console.log("no user was found")
                    var userPassword = generateHash(password);
                    var data = {
                            email: email,
                            password: userPassword,
                            storename: req.body.storename,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            stripekey: req.body.stripekey
                        };
 
                    User.create(data).then(function(newUser, created) {
                        // console.log('data:', data)
                        if (!newUser) {
                            console.log("new user was not created")
                            return done(null, false);
                        }
                        if (newUser) { 
                            console.log("new user was created")
                            
                            console.log('newUser.dataValues:', newUser.dataValues)
                            return done(null, newUser.dataValues);
                        }
                        
                    });
                }
            });
        }
 
    ));
    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
 
    {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
 
 
    function(req, email, password, done) {
 
        var User = db.User;
        var isValidPassword = function(userpass, password) {
            return bCrypt.compareSync(password, userpass);
        }
 
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
 
            if (!user) {
 
                return done(null, false, {
                    message: 'Email does not exist'
                });
 
            }
 
            if (!isValidPassword(user.password, password)) {
 
                return done(null, false, {
                    message: 'Incorrect password.'
                });
 
            }
 
            var userinfo = user.get();
            console.log('userinfo:', userinfo)
            return done(null, userinfo);

        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        }); 
    }
 
)); 
}