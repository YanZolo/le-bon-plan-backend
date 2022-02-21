const res = require('express/lib/response');
const {v4} = require('uuid')

class ProductsController {
    //private property with #
    #products = []
    

    getProducts() {
        return this.#products;
    }

    saveProduct(product) {
        const mappedProduct =  {
            _id: product._id || v4(),
            title: product.title
        }
        this.#products.push(mappedProduct)
        
        return mappedProduct
    }

    updateProduct({id, title}) {
        const product = this.#products
        const result = product.filter(elem => elem._id === id)[0] 
        result.title = title
        return result
    }

    deleteProduct(id) {
        const updatedListProducts = this.#products.filter(elem => elem._id !== id);
        this.#products = updatedListProducts;
        return updatedListProducts;
    }
}

module.exports = {
    ProductsController
}