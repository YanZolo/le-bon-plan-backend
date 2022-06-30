import { AdminController } from './adminController.js';
import { createRouter } from '../../utils/createRouter.js';
import { Middlewares } from '../../middlewares/Auth.js';
const adminController = new AdminController();
const middlewares = new Middlewares();
const routes = [{
  path: '/admin/user/add',
  method: 'POST',
  handler: adminController.addUser.bind(adminController)
}, {
  path: '/admin/users/all',
  method: 'GET',
  pre: [middlewares.isAuth.bind(middlewares)],
  handler: adminController.getAllUsers.bind(adminController)
}, {
  path: '/admin/products/all',
  method: 'GET',
  handler: adminController.getAllProducts.bind(adminController)
}, {
  path: '/admin/user/single/:id',
  method: 'GET',
  handler: adminController.getUser.bind(adminController)
}, {
  path: '/admin/product/:id',
  method: 'GET',
  handler: adminController.getProduct.bind(adminController)
}, {
  path: '/admin/user/update/:id',
  method: 'PATCH',
  handler: adminController.updateUser.bind(adminController)
}, {
  path: '/admin/product/update/:id',
  method: 'PATCH',
  handler: adminController.updateUser.bind(adminController)
}, {
  path: '/admin/user/delete/:id',
  method: 'DELETE',
  handler: adminController.deleteUser.bind(adminController)
}, {
  path: '/admin/product/delete/:id',
  method: 'DELETE',
  handler: adminController.deleteProduct.bind(adminController)
}];
export default createRouter(routes);
//# sourceMappingURL=routes.js.map