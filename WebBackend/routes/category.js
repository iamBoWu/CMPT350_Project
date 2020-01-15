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

router.get('/',function(req,res,next){
    let sql = 'SELECT CategoryName FROM Category';
    con.query(sql,function(err,rows){
        if (err) throw err;
        res.send(rows);
    });
});

router.get('/:CategoryName',function(req, res, next) {
    let sql1 = `SELECT CategoryID FROM Category WHERE CategoryName = '${req.params.CategoryName}'`;
    con.query(sql1,function(err,rows){
        if (err) throw err;
        let sql = "SELECT * FROM Products WHERE CategoryID = ?";
        con.query(sql,rows[0].CategoryID,function(err,rows){
            if (err) throw err;
            res.send(rows);
        });
    });

});



module.exports = router;