const res = require('express/lib/response');
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

    updateProduct({id, title}) {
        console.log('id :>> ', id);
        console.log('arguments :>> ', arguments);
        const product = this.#products
        const result = product.filter(elem => elem._id == id) 
        console.log('result :>> ', result);
        result[0].title = title
        return result[0]
    }
}

module.exports = {
    ProductsController
}