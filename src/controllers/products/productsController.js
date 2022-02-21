const {v4} = require('uuid')
// const ProductModel = require('../../models/productModel')

class ProductsController {
  

    #products = []
   
    getProducts() { // fait office de getter pour recuperer #products ?
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
        console.log('arguments :>> ', arguments);
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