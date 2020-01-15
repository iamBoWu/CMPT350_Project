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

const authCheck = function(req,res,next){
    if (!req.user){
        res.redirect('http://localhost:3000')
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

router.post('/orderproducts',authCheck,function(req,res){
    console.log(req.body);
    let sql1 = `SELECT PaymentID FROM Payment WHERE PaymentMethod = '${req.body.PaymentMethod}'`;
    con.query(sql1, function (err, rows1) {
        if (err) throw err;
        let sql2 = `SELECT ShipperID FROM Shippers WHERE CompanyName = '${req.body.CompanyName}'`;
        con.query(sql2, function (err, rows2) {
            if (err) throw err;
            let sql3 = `SELECT CustomerID FROM Customers WHERE username = '${req.body.username}'`;
           // let sql3 = `SELECT CustomerID FROM Customers WHERE username = '${req.body.username}'`;
            con.query(sql3, function (err, rows3) {
                if (err) throw err;
                var shipDate = '2019-04-05';
                var estimateDate = '2019-04-10';
                //var orderNumber = req.body.OrderID;
                var myObj = {
                    //OrderID : orderNumber ,
                    CustomerID : rows3[0].CustomerID,
                    ShipperID : rows2[0].ShipperID,
                    PaymentID : rows1[0].PaymentID,
                    ShipDate : shipDate,
                    EstimateDate : estimateDate,
                    orderPrice : req.body.orderPrice
                };
                let sql4 = "INSERT INTO Orders SET ?";
                con.query(sql4, myObj,function (err, rows4) {
                    if (err) throw err;
                    let sql9 = "SELECT OrderID From Orders ORDER BY OrderDate DESC LIMIT 1";
                    con.query(sql9, [rows3[0].CustomerID],function (err, rows9) {
                        if (err) throw err;
                        var prodList = req.body.products;
                        for(i = 0; i < prodList.length; i++){
                            let quan = prodList[i].count;
                            let sql5 = `SELECT ProductID,Price FROM Products WHERE ProductName = '${prodList[i].ProductName}'`;
                            con.query(sql5,function (err, rows5) {
                                if (err) throw err;
                                var myObj2 = {
                                    OrderID: rows9[0].OrderID,
                                    ProductID: rows5[0].ProductID,
                                    Price: rows5[0].Price,
                                    quantity: quan
                                };
                                let sql = "INSERT INTO OrderProducts SET ?";
                                con.query(sql, myObj2, function (err, rows) {
                                    if (err) throw err;
                                });
                            })
                        }
                        res.send({message: 'Added to OrderProducts'});
                    });
                });

            });
        });
    });
});

module.exports = router;
