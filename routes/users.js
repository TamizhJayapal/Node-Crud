var express = require('express')
var app = express()

app.get('/', function(req, res, next) {
	req.getConnection(function(err, conn) {
		conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
			if (err) {
				res.render('user/list', {
					title: 'User List', 
					data: ''
				})
			} else {
				res.render('user/list', {
					title: 'User List', 
					data: rows
				})
			}
		})
	})
})

app.get('/add', function(req, res, next) {
	res.render('user/add', {
					title: 'Add New User',
					name: "",
					age: "",
					email: ""
	})
	})

app.post('/add', function(req, res, next) {
	var user = {
		name:req.body.name,
		age:req.body.age,
		email:req.body.email
	}
	req.getConnection(function(err, conn) {
		conn.query('INSERT INTO users SET ?',user,function(err, rows, fields) {
			if (err) {
				console.log("no")
				res.render('user/add', {
					title: 'Add New User',
					name: user.name,
					age: user.age,
					email: user.email 
				})
			} else {
				console.log("inserted")
				res.render('user/add', {
					
					title: 'Add New User',
					name: "",
					age: "",
					email: ""
				})
			}
		})
	})
})


app.delete('/delete/(:id)', function(req, res, next) {
	req.getConnection(function(err, conn) {
		conn.query('delete from users where id = ?', req.params.id,function(err, rows, fields) {	
				res.redirect('/users');
			
		})
	})
})
module.exports = app
