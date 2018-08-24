
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var http = require('http');
var mysql = require('mysql');

//var myConnection = require('express-myconnection')
//app.use(myConnection(mysql, dbOption, 'pool'))
var pool = mysql.createPool({    
	port:'3000',
	user:'root',
	password:'',
	database:'test',
	queueLimit : 0, 
	connectionLimit : 0

})

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var index = require('./routes/index');
var users = require('./routes/users');

app.use('/', index);
app.use('/list',users)

 app.listen(3000, function(){
    console.log('Server running at port 3000: http://localhost:3000');
})