const express = require('express');
const Router = express.Router();
const {UserController} = require('./usersController');
const userController = new UserController;

Router.get('/', (req, res) => {
    const users = userController.getAllUsers();
    res.json(users);
});

Router.post('/', (req, res) => {
    const newUser = userController.saveUser({
        name: req.body.name
    });
    res.json(newUser);
});

Router.get('/:id', (req, res) => {
    const user = userController.getUser({
        _id: req.params.id
    });
    res.json({
        user: user
    });
});

Router.patch('/:id', (req, res) => {
    const user = userController.updateUser({
        _id: req.params.id,
        name: req.body.name
    });
    res.json({
        message: 'user updated !',
        user: user
    })
});

Router.delete('/:id', (req, res) => {
    const user = userController.deleteUser({
        _id: req.params.id
    });
    res.json({
        message: `The User '${user.name}' Has Been Deleted`
    })
});


module.exports =  Router;