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


Router.patch('/:id', (req, res) => {
    productsController.updateProduct({id: req.params.id, title: req.body.title});
    res.send('product updated !')
})

Router.delete('/:id', (req, res) => {
    productsController.deleteProduct(req.params.id);
    res.send('product deleted')
})

module.exports = Router