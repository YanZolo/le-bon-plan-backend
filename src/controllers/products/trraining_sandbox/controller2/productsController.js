// import {v4} from 'uuid';

// module.exports.ProductsController = class ProductsController {
  

//     #products = []
   
//     getProducts() { 
//         return this.#products; 
//     } 

//     saveProduct(product) {
//         const mappedProduct =  {
//             _id: product._id || v4(),
//             title: product.title
//         }
//         this.#products.push(mappedProduct)
        
//         return mappedProduct
//     }

//     updateProduct({id, title}) {
//         console.log('arguments :>> ', arguments);
//         const product = this.#products
//         const result = product.filter(elem => elem._id === id)[0] 
//         result.title = title
//         return result
//     }

//     deleteProduct(id) {
//         const updatedListProducts = this.#products.filter(elem => elem._id !== id);
//         this.#products = updatedListProducts;
//         return updatedListProducts;
//     }
// }

import productModel from "../../../../models/productModel";


export class ProductController {
    getProducts() {
        return productModel.find();
    }
    getProduct({ params: { id } }) {
        const products = productModel.findById(id)
        if (!product){
            throw new Error('product not found');
        }
        return products
    }
}
