import { AdminController } from "./adminController.js";
import { Middlewares } from '../../middlewares/Auth.js';
import { createRouter, RoutesOptions } from "../../utils/createRouter.js";
const adminController = new AdminController();
const middlewares = new Middlewares();


const routes : RoutesOptions[] = [
    {
        path: '/admin/users/all',
        method: 'GET',
        pre: [
            middlewares.isAuth.bind(middlewares)
          ],
        handler: adminController.getAllUsers.bind(adminController)
    },
    {
        path: '/admin/products/all',
        method: 'GET',
        pre: [
            middlewares.isAuth.bind(middlewares)
          ],
        handler: adminController.getAllProducts.bind(adminController)
    },
    {
        path: '/admin/user/:id',
        method: 'GET',
        pre: [
            middlewares.isAuth.bind(middlewares)
          ],
        handler: adminController.getUser.bind(adminController)
    },
    {
        path: '/admin/product/:id',
        method: 'GET',
        pre: [
            middlewares.isAuth.bind(middlewares)
          ],
        handler: adminController.getProduct.bind(adminController)
    },
    {
        path: '/admin/user/update/:id',
        method: 'PATCH',
        pre: [
            middlewares.isAuth.bind(middlewares)
          ],
        handler: adminController.updateUser.bind(adminController)
    },
    {
        path: '/admin/product/update/:id',
        method: 'PATCH',
        pre: [
            middlewares.isAuth.bind(middlewares)
          ],
        handler: adminController.updateUser.bind(adminController)
    },
    {
        path: '/admin/user/delete/:id',
        method: 'DELETE',
        pre: [
            middlewares.isAuth.bind(middlewares)
          ],
        handler: adminController.deleteUser.bind(adminController)
    },
    {
        path: '/admin/product/delete/:id',
        method: 'DELETE',
        pre: [
            middlewares.isAuth.bind(middlewares)
          ],
        handler: adminController.deleteProduct.bind(adminController)
    },

]

export default createRouter(routes);