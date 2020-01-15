const router = require('express').Router();
const passport = require('passport');
const mysql = require('mysql');
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require('crypto');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1L0V3meaT.',
    database: '350Project'
});

con.connect(function(err){
    if (err) throw err;
    console.log("Project DATABASE Connected!!!");
});


router.post('/login', passport.authenticate('local-login', {
    //successRedirect: '/customer/',
    failureRedirect: '/auth/login',
    failureFlash: true
}),(req,res) => {
    if (req.user) {
        res.send(req.user);
    }
});

router.get('/login', function(req, res,next){
    // var msg = req.flash('loginMessage');
    // res.send({message:msg});
    res.send(null);
    next()
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000')
});



router.post('/signup', passport.authenticate('local-signup', {
    //successRedirect: '/customer/',
    failureRedirect: '/auth/signup',
    failureFlash: true
}),(req,res) => {
    console.log('123');
    if (req.user) {
        res.send(req.user);
    }
});

router.get('/signup', function(req, res,next){
    res.send(null);
    //res.send({message: req.flash('signupMessage')});
    next()
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

    //res.send(req.user);
    res.redirect('http://localhost:3000');

});

// router.get('/forgot', function(req, res,next){
//     var msg = req.flash('ForgotMessage');
//     res.send({message:msg});
//     next();
// });
//
// router.post('/forgot', function(req, res,next){
//     async.waterfall([
//         function (done) {
//             crypto.randomBytes(20)
//         }
//     ])
// });
//
// router.post('/forgot', function(req, res,next){
//     router.post('/forgot', function(req, res, next) {
//         async.waterfall([
//             function(done) {
//                 crypto.randomBytes(20, function(err, buf) {
//                     var token = buf.toString('hex');
//                     done(err, token);
//                 });
//             },
//             function(token, done) {
//                 let sql = `SELECT * FROM Customers WHERE email = '${req.body.email}'`;
//                 con.query(sql,con.query(sql5,function (err, rows) {
//                     if (err) throw err;
//                     if(rows.length == 0){
//                         req.flash('error', 'No account with that email address exists.');
//                         return res.redirect('/forgot');
//                     }
//                     user.resetPasswordToken = token;
//                     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//
//                     user.save(function(err) {
//                         done(err, token, user);
//                     });
//                 }));
//             },
//             function(token, user, done) {
//                 var smtpTransport = nodemailer.createTransport({
//                     service: 'Gmail',
//                     auth: {
//                         user: 'learntocodeinfo@gmail.com',
//                         pass: process.env.GMAILPW
//                     }
//                 });
//                 var mailOptions = {
//                     to: user.email,
//                     from: 'learntocodeinfo@gmail.com',
//                     subject: 'Node.js Password Reset',
//                     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//                         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//                         'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//                         'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//                 };
//                 smtpTransport.sendMail(mailOptions, function(err) {
//                     console.log('mail sent');
//                     req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//                     done(err, 'done');
//                 });
//             }
//         ], function(err) {
//             if (err) return next(err);
//             res.redirect('/forgot');
//         });
//     });
// });


module.exports = router;