import { AdminController } from "./adminController.js";
import { Middlewares } from '../../middlewares/Auth.js';
import { createRouter, RoutesOptions } from "../../utils/createRouter.js";
import AuthController from "../auth/authController.js";
const adminController = new AdminController();
const middlewares = new Middlewares();
const authController = new AuthController();


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
        path: '/admin/user/single/:id',
        method: 'GET',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.getUser.bind(adminController)
    },
    {
        path: '/admin/product/single/:id',
        method: 'GET',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.getProduct.bind(adminController)
    },
    {
        path: '/admin/user/add',
        method: 'POST',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.addUser.bind(adminController)
    },
    {
        path: '/admin/product/add',
        method: 'POST',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.addProduct.bind(adminController)
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
        path: '/admin/product/delete/:id',
        method: 'DELETE',
        // pre: [
        //     middlewares.isAuth.bind(middlewares)
        //   ],
        handler: adminController.deleteProduct.bind(adminController)
    },
    {
      path: '/admin/login',
      method: 'GET',
      // pre:[
      //   middlewares.isNotAuth.bind(middlewares)
      // ],
      handler: adminController.displayLoginView.bind(authController)
    },
    {
      path: '/admin/login',
      method: 'POST',
      // pre:[
      //   middlewares.isNotAuth.bind(middlewares)
      // ],
      handler: authController.handleLogin.bind(authController)
    },
    {
      path: '/admin/register',
      method: 'GET',
      // pre:[
      //   middlewares.isNotAuth.bind(middlewares)
      // ],
      handler: adminController.displayRegisterView.bind(authController)
    },
    {
      path: '/admin/register',
      method: 'POST',
      // pre:[
      //   middlewares.isNotAuth.bind(middlewares)
      // ],
      handler: authController.handleRegister.bind(authController)
    },
    {
      path: '/admin/logout',
      method: 'GET',
      // pre:[
      //   middlewares.isAuth.bind(middlewares)
      // ],
      handler: authController.handleLogout.bind(authController)
    }

]

export default createRouter(routes);