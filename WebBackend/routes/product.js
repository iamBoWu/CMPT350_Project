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

router.get('/:productname',function(req, res, next) {
    let sql = `SELECT * FROM Products WHERE ProductName = '${req.params.productname}'`;
    con.query(sql,function(err,rows){
        if (err) throw err;
        console.log(rows[0]);
        res.send(rows);
    });
});



module.exports = router;
