import { AdminController } from "./adminController.js";
import { createRouter, RoutesOptions } from "../../utils/createRouter.js";
const adminController = new AdminController();



const routes : RoutesOptions[] = [
    {
        path: '/admin/users/all',
        method: 'GET',
        handler: adminController.getAllUsers.bind(adminController)
    },
    {
        path: '/admin/products/all',
        method: 'GET',
        handler: adminController.getAllProducts.bind(adminController)
    },
    {
        path: '/admin/user/:id',
        method: 'GET',
        handler: adminController.getUser.bind(adminController)
    },
    {
        path: '/admin/product/:id',
        method: 'GET',
        handler: adminController.getProduct.bind(adminController)
    },
    {
        path: '/admin/user/update/:id',
        method: 'PATCH',
        handler: adminController.updateUser.bind(adminController)
    },
    {
        path: '/admin/product/update/:id',
        method: 'PATCH',
        handler: adminController.updateUser.bind(adminController)
    },
    {
        path: '/admin/user/delete/:id',
        method: 'DELETE',
        handler: adminController.deleteUser.bind(adminController)
    },
    {
        path: '/admin/product/delete/:id',
        method: 'DELETE',
        handler: adminController.deleteProduct.bind(adminController)
    },

]

export default createRouter(routes);