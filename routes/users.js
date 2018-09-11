var express = require('express')
var app = express()

app.get('/', function(req, res, next) {
	req.getConnection(function(err, conn) {
		conn.query('SELECT * FROM users',function(err, rows, fields) {
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
				res.render('user/add', {
					title: 'Add New User',
					name: user.name,
					age: user.age,
					email: user.email 
				})
			} else {
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

app.get('/edit/(:id)', function(req, res, next) {
	req.getConnection(function(err, conn) {
		conn.query('select * from users where id = ?', req.params.id,function(err, rows, fields) {	
			res.render('user/edit', {					
				title: 'edit User',
				id: rows[0].id,
				name: rows[0].name,
				age: rows[0].age,
				email:  rows[0].email
			})		
		})
	})
})

app.put('/edit/(:id)', function(req, res, next) {
	var user = {
		name:req.body.name,
		age:req.body.age,
		email:req.body.email
	}
	req.getConnection(function(err, conn) {
		conn.query('update users set ? where id = '+ req.params.id, user,function(err, rows, fields) {	
				res.redirect('/users');		
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
