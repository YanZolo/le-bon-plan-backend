const express = require('express');
const {ProductsController} = require('./productsController')
const Router = express.Router()
const productsController = new ProductsController()

Router.get('/', async (req, res) => {
    const products = await productsController.getProducts()
    res.json(products)

/* 
    try {
        const result = await productsController.getProducts(req);
        res.status(responseStatus).json(result);
    } catch(e) {
        res.status(e.status || 500).json({
            name: e.name || 'INTERNAL_ERROR',
            message: e.message,
            status: e.status || 500,
            stack: process.env.NODE_ENV !== 'production' ? e.stack : null
        })
    } */  // equal to Router.get('/') ....
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