const express = require('express');
const Router = express.Router()

const products = []

Router.get('/', (req, res) => {
    res.send(products)
})

Router.post('/', (req, res) => {
    products.push(req.body.name)
    res.json(products)
    console.log(products)
})

module.exports = Router