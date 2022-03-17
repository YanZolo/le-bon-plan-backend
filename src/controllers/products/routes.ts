import { ProductsController } from './productsController.js';
import { createRouter, RoutesOptions } from '../../utils/createRouter.js';
const productController = new ProductsController();

const routes: RoutesOptions[] = [
  {
    path: '/',
    method: 'GET',
    handler: productController.getProducts.bind(productController)
  },
  {
    path: '/',
    method: 'POST',
    handler: productController.addProduct.bind(productController),
    responseStatus: 201
  },
  {
    path: '/:id',
    method: 'GET',
    pre: [
    
    ],
    handler: productController.getProduct.bind(productController)
  },
  {
    path: '/:id',
    method: 'PATCH',
    handler: productController.updateProduct.bind(productController)
  },
  {
    path: '/:id',
    method: 'DELETE',
    handler: productController.deleteProduct.bind(productController),
    responseStatus: 204
  }
];

export default createRouter(routes);
