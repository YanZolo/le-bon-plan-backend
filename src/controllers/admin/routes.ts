import { AdminController } from "./adminController.js";
import { createRouter, RoutesOptions } from "../../utils/createRouter.js";
import AuthController from "../auth/authController.js";
const adminController = new AdminController();
// const middlewares = new Middlewares();
const authController = new AuthController()


const routes : RoutesOptions[] = [
    {
        path: '/admin/users/all',
        method: 'GET',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.getAllUsers.bind(adminController)
    },
    {
        path: '/admin/products/all',
        method: 'GET',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.getAllProducts.bind(adminController)
    },
    {
        path: '/admin/user/:id',
        method: 'GET',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.getUser.bind(adminController)
    },
    {
        path: '/admin/product/:id',
        method: 'GET',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.getProduct.bind(adminController)
    },
    {
        path: '/admin/user/update/:id',
        method: 'PATCH',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.updateUser.bind(adminController)
    },
    {
        path: '/admin/product/update/:id',
        method: 'PATCH',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.updateUser.bind(adminController)
    },
    {
        path: '/admin/user/delete/:id',
        method: 'DELETE',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.deleteUser.bind(adminController)
    },
    {
        path: '/auth/login',
        method: 'POST',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: authController.handleLogin.bind(authController)
    },
    {
        path: '/auth/register',
        method: 'POST',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: authController.handleRegister.bind(authController)
    },
    {
        path: '/auth/logout',
        method: 'GET',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: authController.handleLogout.bind(authController)
    },

]

export default createRouter(routes);