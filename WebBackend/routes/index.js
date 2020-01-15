var express = require('express');
var router = express.Router();
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

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    var customerProfile ={
      profile : req.user
    };
    res.send(customerProfile);
  }
  else{
    res.send("");
  }
});

router.get('/search/:name',function(req,res,next){
  console.log("Got request" + req.params.name);
  let sql = `SELECT * FROM Products WHERE ProductName LIKE '${req.params.name}%'`;
  con.query(sql,function(err,rows){
    if (err) throw err;
    if(rows.length == 0){
      let sql1 = `SELECT CategoryID FROM Category WHERE CategoryName LIKE '${req.params.name}%'`;
      con.query(sql1,function(err,rows){
        if (err) throw err;
        let sql2 = "SELECT * FROM Products WHERE CategoryID = ?";
        con.query(sql2,rows[0].CategoryID,function(err,rows){
          if (err) throw err;
          res.send(rows);
        });
      })
    }
    else{
      res.send(rows);
    }
  });
});



router.get('/newarrival',function(req,res,next){
  let sql = 'SELECT ProductName,Brand,price,Picture FROM Products ORDER BY arrivalTime DESC LIMIT 4';
  con.query(sql,function(err,rows){
    if (err) throw err;
    //result = JSON.stringify({rooms:result});
    res.send(rows);
  });
});


router.get('/hotproducts',function(req,res,next){
  let sql = 'SELECT ProductName,Brand,price,Picture FROM Products ORDER BY saled DESC LIMIT 4';
  con.query(sql,function(err,rows){
    if (err) throw err;
    //result = JSON.stringify({rooms:result});
    res.send(rows);
  });
});


module.exports = router;
