const express = require('express');
const Route = express.Router()
const controllerAuth = require('../controllerAuth');


// routes get

Route.get('/', controllerAuth.authenticateToken, (req, res) => {
    res.json(req.user)
})
Route.get('/register', (req, res) => {
    res.render('register')
})
Route.get('/login', (req, res) => {
    res.render('login')
})

// routes post

Route.post('/register', controllerAuth.registerUser)
Route.post('/login', controllerAuth.authenticateUser)

//routes patch

Route.patch('/:id', controllerAuth.uptdateUser)

module.exports = Route
