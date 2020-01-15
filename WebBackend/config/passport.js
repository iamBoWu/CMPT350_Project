const keys = require('./keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcrypt-nodejs');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1L0V3meaT.',
    database: '350Project'
});

con.connect(function(err){
    if (err) throw err;
});

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(user, done) {
        con.query("SELECT * FROM Customers WHERE CustomerID = ? ", [user],
        function (err, rows){
            done(null, rows[0]);
        })
    });

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback: true
            },
            function(req, username, password, done){
                con.query("SELECT * FROM Customers WHERE username = ? ", [username],
                    function(err, rows){
                        if(err)
                            return done(err);
                        if(!rows.length){
                            return done(null, false, req.flash('loginMessage', 'No User Found'));
                        }
                        if(!bcrypt.compareSync(password, rows[0].password)) {
                            return done(null, false, req.flash('loginMessage', 'Wrong Password'));
                        }
                        var oldUser = {
                            id: rows[0].CustomerID,
                            username: rows[0].username,
                            FirstName: rows[0].FirstName,
                            LastName: rows[0].LastName
                        };
                        return done(null,oldUser);
                    });
            })
    );

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField : 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, username, password ,done){
                con.query("SELECT * FROM Customers WHERE username = ? ",
                    [username], function(err, rows){

                        if(err)
                            return done(err);
                        if(rows.length){
                            return done(null, false, req.flash('signupMessage', 'That is already taken'));
                        }else{
                            var newUser = {
                                username: username,
                                password: bcrypt.hashSync(password, null, null)
                            };
                            var insertQuery = "INSERT INTO Customers SET ?";
                            con.query(insertQuery, newUser, function (err, rows) {
                                newUser.id = rows.insertId;
                                return done(null, newUser);
                            })
                        }
                    });
            })
    );

    passport.use(
        new GoogleStrategy({
            // options for google strategy
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: '/auth/google/redirect'
        }, (accessToken, refreshToken, profile, done) => {
            // // passport callback function
            con.query("SELECT * FROM Customers WHERE username = ? ",
                [profile.displayName],function(err, rows){
                    if(err)
                        return done(err);
                    if(rows.length) {
                        var oldUser = {
                            id: rows[0].CustomerID,
                            username: rows[0].username,
                            FirstName: rows[0].FirstName,
                            LastName: rows[0].LastName
                        };
                        return done(null,oldUser)
                        // return done(null, false, req.flash('signupMessage', 'That is already taken'));
                    }
                    else{
                        var newUser = {
                            username: profile.displayName,
                            FirstName: profile.name.familyName,
                            LastName: profile.name.givenName
                        };
                        var insertQuery = "INSERT INTO Customers SET ?";
                        con.query(insertQuery, newUser, function (err, rows) {
                            newUser.id = rows.insertId;
                            return done(null, newUser);
                        })
                    }
                })

        })
    );
};

