import { ProductsController } from './productsController.js';
import { createRouter } from '../../utils/createRouter.js';
const productController = new ProductsController();
const routes = [{
  path: '/',
  method: 'GET',
  handler: productController.getProducts.bind(productController)
}, {
  path: '/',
  method: 'POST',
  handler: productController.addProduct.bind(productController),
  responseStatus: 201
}, {
  path: '/:id',
  method: 'GET',
  handler: productController.getProduct.bind(productController)
}, {
  path: '/:id',
  method: 'PATCH',
  handler: productController.updateProduct.bind(productController)
}, {
  path: '/:id',
  method: 'DELETE',
  handler: productController.deleteProduct.bind(productController),
  responseStatus: 204
}];
export default createRouter(routes);
//# sourceMappingURL=routes.js.map