var express = require('express');
var app = express();
app.get('/',function(req,res,next){
    pool.getConnection(function(error, conn){
        conn.query('SELECT * FROM Persons ORDER BY id DESC',function(err, rows, fields){
            if(error){
                res.render('users/list',{title:'user list',data:''})
            }else{
                res.render('users/list',{title:'user list',data:rows})
                }
        })
    })
})
module.exports = app;