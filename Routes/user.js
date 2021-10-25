const express = require('express');
const Route = express.Router()

const users = []

Route.get('/', (req, res) => {
    res.send(users)
})

Route.post('/', (req, res) => {
    users.push(req.body.name)
    res.json(users)
    
    console.log(req.body.name)
})

Route.patch('/:id', (req, res) => {
    res.json(req.params.id)
})

module.exports = Route