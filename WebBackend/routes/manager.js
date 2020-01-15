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

router.get('/',function(req, res, next) {
    let sql = 'SELECT * FROM Products';
    con.query(sql,function(err,rows){
        if (err) throw err;
        res.send(rows);
    });
});

router.options('/deleteproduct',function(req, res, next) {
    next();
});

//delete a product from store
router.delete('/deleteproduct',function(req,res){
    let sql1 = "SELECT CategoryID FROM Category WHERE CategoryName = ?";
    con.query(sql1,req.body.CategoryName,function(err,rows){
        if (err) throw err;
        let sql = `DELETE FROM Products WHERE CategoryID = '${rows[0].CategoryID}' AND Brand = '${req.body.Brand}'`;
        con.query(sql,function(err,rows){
            if (err) throw err;
            res.send({message : "Delete successfully"});
        });
    });
});

// Add product to our store
router.post('/addproduct',function(req, res, next) {
    let sql1 = "SELECT CategoryID FROM Category WHERE CategoryName = ?";
    con.query(sql1,req.body.CategoryName,function(err,rows){
        if (err) throw err;
        var myObj = {
            ProductName : req.body.ProductName,
            Brand : req.body.Brand,
            weight: req.body.weight,
            price: req.body.price,
            stock: req.body.stock,
            CategoryID : rows[0].CategoryID,
            ManagerID : 1,
            Picture : req.body.Picture,
            description : req.body.description
        };
        let sql = "INSERT INTO Products SET ?";
        con.query(sql,myObj,function(err,rows){
            if (err) throw err;
            //result = JSON.stringify( {posts:result});
            res.send({message: "Add Successful"});
        });
    });

});

router.get('/getallsuppliers',function(req,res,next){
    let sql1 = "SELECT CategoryID FROM Category WHERE CategoryName = ?";
});


module.exports = router;