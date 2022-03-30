import { createRouter } from "../../utils/createRouter.js";
import AuthController from "./authController.js";
const authController = new AuthController();
const routes = [{
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