const {v4} = require('uuid')

class ProductsController {
    //private property with #
    #products = []
    

    getProducts() {
        return this.#products;
    }

    saveProduct(product) {
        const mappedProduct =  {
            _id: product._id || v4(),
            title: product.title
        }
        this.#products.push(mappedProduct)
        
        return mappedProduct
    }
}

module.exports = {
    ProductsController
}