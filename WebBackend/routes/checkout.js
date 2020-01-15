var express = require('express');
var router = express.Router();
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


const authCeck = function(req,res,next){
    if (!req.user){
        res.redirect('/auth/google')
    }else{
        next();
    }
};

// router.get('/', authCeck,function(req, res, next) {
//     var customerProfile ={
//         profile : req.user
//     };
//     res.send(customerProfile);
// });
//
// router.get('/country', authCeck,function(req, res, next) {
//     let sql = 'SELECT (Name) FROM country';
//     world.query(sql,function(err,rows){
//         if (err) throw err;
//         res.send(rows);
//     });
// });


router.get('/myprofile',function(req, res,) {
        let sql1 = "SELECT * FROM Customers WHERE username = ?";
        con.query(sql1,[req.body.username],function (err,rows){
            if (err) throw err;
            if (rows.length != 0){
                res.send("hurt")
            }
            else{
                res.send("Complete")
            }
        });
});

// router.get('/ca_provinces', authCeck,function(req, res, next) {
//     let sql = 'SELECT (name) FROM ca_provinces';
//     con.query(sql,function(err,rows){
//         if (err) throw err;
//         res.send(rows);
//     });
// });
//
// router.get('/payment', authCeck,function(req, res, next) {
//     let sql = 'SELECT (PaymentMethod) FROM Payment';
//     world.query(sql,function(err,rows){
//         if (err) throw err;
//         res.send(rows);
//     });
// });
//
// router.get('/shipping', authCeck,function(req, res, next) {
//     let sql = 'SELECT (CompanyName) FROM Shippers';
//     world.query(sql,function(err,rows){
//         if (err) throw err;
//         res.send(rows);
//     });
// });
//

module.exports = router;