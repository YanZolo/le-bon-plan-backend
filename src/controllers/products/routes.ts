import { ProductsController } from './productsController.js';
import { createRouter, RoutesOptions } from '../../utils/createRouter.js';
const productController = new ProductsController();

const routes: RoutesOptions[] = [
  {
    path: '/products/all',
    method: 'GET',
    handler: productController.getProducts.bind(productController)
  },
  {
    path: '/product/add',
    method: 'POST',
    handler: productController.addProduct.bind(productController),
    responseStatus: 201
  },
  {
    path: '/product/:id',
    method: 'GET',
    pre: [
    
    ],
    handler: productController.getProduct.bind(productController)
  },
  {
    path: '/product/update/:id',
    method: 'PATCH',
    handler: productController.updateProduct.bind(productController)
  },
  {
    path: '/product/delete/:id',
    method: 'DELETE',
    handler: productController.deleteProduct.bind(productController),
    responseStatus: 204
  }
];

export default createRouter(routes);
