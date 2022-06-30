import { ProductsController } from './productsController.js';
import { createRouter, RoutesOptions } from '../../utils/createRouter.js';
import { Middlewares } from '../../middlewares/Auth.js';
const productController = new ProductsController();
const middlewares = new Middlewares();

const routes: RoutesOptions[] = [
  {
    path: '/products/all',
    method: 'GET',
    pre: [middlewares.isAuth.bind(middlewares)],
    handler: productController.getProducts.bind(productController)
  },
  {
    path: '/product/add',
    method: 'POST',
    pre: [middlewares.isAuth.bind(middlewares)],
    handler: productController.addProduct.bind(productController),
    responseStatus: 201
  },
  {
    path: '/product/:id',
    method: 'GET',
    pre: [middlewares.isAuth.bind(middlewares)],
    handler: productController.getProduct.bind(productController)
  },
  {
    path: '/product/update/:id',
    method: 'PATCH',
    pre: [middlewares.isAuth.bind(middlewares)],
    handler: productController.updateProduct.bind(productController)
  },
  {
    path: '/product/delete/:id',
    method: 'DELETE',
    pre: [middlewares.isAuth.bind(middlewares)],
    handler: productController.deleteProduct.bind(productController),
    responseStatus: 204
  }
];

export default createRouter(routes);
