const express = require('express');
const Router = express.Router();
const {UserController} = require('./usersController');
const userController = new UserController;

Router.get('/', (req, res) => {
    const users = userController.getAllUsers()
    res.json(users)
})

Router.post('/', (req, res) => {
    const newUser = userController.saveUser({
        name: req.body.name
    })
    res.json(newUser)
})


module.exports =  Router;