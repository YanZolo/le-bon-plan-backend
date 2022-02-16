const express = require('express');
const Route = express.Router()
const authController = require('../controllers/authController');


// routes get

Route.get('/', authController.authenticateToken, (req, res) => {
    res.json(req.user)
})
Route.get('/register', (req, res) => {
    res.render('register')
})
Route.get('/login', (req, res) => {
    res.render('login')
})

// routes post

Route.post('/register', authController.registerUser)
Route.post('/login', authController.authenticateUser)

//routes patch

Route.patch('/:id', authController.uptdateUser)

module.exports = Route
