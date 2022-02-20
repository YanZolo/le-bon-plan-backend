const express = require('express');
const {ProductsController} = require('./productsController')
const Router = express.Router()
const productsController = new ProductsController()

Router.get('/', (req, res) => {
    const products = productsController.getProducts()
    res.json(products)
})

Router.post('/', (req, res) => {
    const product = productsController.saveProduct({
        title: req.body.title
    })
    console.log('product ==> ', product);
    res.json(product)
})

module.exports = Router