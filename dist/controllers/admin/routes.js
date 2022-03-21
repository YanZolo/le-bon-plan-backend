import { AdminController } from "./adminController.js";
import { createRouter } from "../../utils/createRouter.js";
import AuthController from "../auth/authController.js";
const adminController = new AdminController();
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
  path: '/admin/user/:id',
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
  path: '/auth/login',
  method: 'POST',
  handler: authController.handleLogin.bind(authController)
}, {
  path: '/auth/register',
  method: 'POST',
  handler: authController.handleRegister.bind(authController)
}, {
  path: '/auth/logout',
  method: 'GET',
  handler: authController.handleLogout.bind(authController)
}];
export default createRouter(routes);
//# sourceMappingURL=routes.js.map