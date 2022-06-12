import { createRouter } from "../../utils/createRouter.js";
import PageController from "./PageController.js";
const pageController = new PageController();
const routes = [{
  path: "/register",
  method: "GET",
  handler: pageController.getRegisterPage.bind(pageController)
}, {
  path: "/login",
  method: "GET",
  handler: pageController.getLoginPage.bind(pageController)
}, {
  path: "/profile",
  method: "GET",
  handler: pageController.getProfilePage.bind(pageController)
}, {
  path: "/products",
  method: "GET",
  handler: pageController.getProductsPage.bind(pageController)
}];
export default createRouter(routes);
//# sourceMappingURL=routes.js.map