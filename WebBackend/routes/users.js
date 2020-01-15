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

const authCheck = function(req,res,next){
  if (!req.body){
    res.redirect('')
  }else{
    next();
  }
};

router.get('/', authCheck,function(req, res, next) {
  var customerProfile ={
    profile : req.user
  };
  res.send(customerProfile);
});

// Birthday: "32345432"
// CreditCard: "23456787654"
// FirstName: "UNIVERSITY"
// LastName: "SASKATCHEWAN"
// PostCode: "S7N 5A2"
// address: "105 Administration Place"
// country: "Canada"
// email: "123@gmail.com"
// username: "Bo Wu

router.post('/updateprofile',function(req,res){
    let sql = `UPDATE Customers SET FirstName = '${req.body.FirstName}', 
     LastName = '${req.body. LastName}',
     email = '${req.body.email}',
     address = '${req.body.address}',
     PostCode = '${req.body.PostCode}',
     country = '${req.body.country}',
     CreditCard = '${req.body.CreditCard}',
     Birthday = '${req.body.Birthday}'
     WHERE username = '${req.body.username}'`;
    con.query(sql, function (err, rows) {
        if (err) throw err;
        console.log(rows);
        var msg ={
          message : 'Your submission successful'
        };
        res.send(msg);
      });
  // });
});


//get all the customer's orders
router.get('/myorders',function(req, res, next) {
  let sql1 = 'SELECT CustomerID FROM Customers WHERE username = ?';
  con.query(sql1,[req.body.username],function(err,rows) {
    if (err) throw err;
    console.log(rows)
    let sql2 = `SELECT * FROM Orders WHERE CustomerID = '${rows[0].CustomerID}'`;
    con.query(sql2,function(err,rows) {
      if (err) throw err;
      res.send(rows);
    })
  });
});

// Customer can delete a order
router.delete('/myorders/:orderid',function(req, res, next) {
  let sql = `DELETE FROM Orders WHERE OrderID = '${req.params.orderid}'`;
  con.query(sql,function(err,result){
    if (err) throw err;
    res.send({messsage:"delete successful"});
  });
});

//Each Order's' information
router.get('/myorderinfo/:orderid', function(req, res, next) {
  let sql1 = `SELECT * FROM OrderProducts WHERE OrderID = '${req.params.orderid}'`;
  con.query(sql1,function(err,rows) {
      if (err) throw err;
      res.send(rows);
  });
});

module.exports = router;
