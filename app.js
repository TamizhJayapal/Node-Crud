var express = require('express')
var app = express()
var mysql = require('mysql')
var myConnection  = require('express-myconnection')
var config = require('./config')
var dbOptions = {
	host:	  'localhost',
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}
app.use(myConnection(mysql, dbOptions, 'pool'))
app.set('view engine', 'ejs')
var index = require('./routes/index')
var users = require('./routes/users')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var methodOverride = require('method-override')
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
 

app.use('/', index)
app.use('/users', users)

app.listen(2500, function(){
	console.log('Server running at port 2500')
})
