import { AdminController } from "./adminController.js";
import { Middlewares } from '../../middlewares/Auth.js';
import { createRouter } from "../../utils/createRouter.js";
import AuthController from "../auth/authController.js";
const adminController = new AdminController();
const middlewares = new Middlewares();
const authController = new AuthController();
const routes = [{
  path: '/admin/users/all',
  method: 'GET',
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
  path: '/admin/product/single/:id',
  method: 'GET',
  handler: adminController.getProduct.bind(adminController)
}, {
  path: '/admin/user/add',
  method: 'POST',
  handler: adminController.addUser.bind(adminController)
}, {
  path: '/admin/product/add',
  method: 'POST',
  handler: adminController.addProduct.bind(adminController)
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
}, {
  path: '/admin/login',
  method: 'GET',
  handler: adminController.displayLoginView.bind(authController)
}, {
  path: '/admin/login',
  method: 'POST',
  handler: authController.handleLogin.bind(authController)
}, {
  path: '/admin/register',
  method: 'GET',
  handler: adminController.displayRegisterView.bind(authController)
}, {
  path: '/admin/register',
  method: 'POST',
  handler: authController.handleRegister.bind(authController)
}, {
  path: '/admin/logout',
  method: 'GET',
  handler: authController.handleLogout.bind(authController)
}];
export default createRouter(routes);
//# sourceMappingURL=routes.js.map