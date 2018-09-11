var express = require('express')
var app = express()

app.get('/', function(req, res) {
	res.render('index', {title: 'CRUD Nodejs'})
})
module.exports = app;
