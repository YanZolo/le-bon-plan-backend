import { UserController } from './usersController.js';
import { createRouter, RoutesOptions } from '../../utils/createRouter.js';
import AuthController from '../auth/authController.js';
import { Middlewares } from '../../middlewares/Auth.js';
const userController = new UserController();
const authController = new AuthController();
const middlewares = new Middlewares();

const routes: RoutesOptions[] = [
  {
    path: '/users/all',
    method: 'GET',
    pre: [
      middlewares.isAuth.bind(middlewares)
    ],
    handler: userController.getAllUsers.bind(userController)
  },
  {
    path: '/user/:id',
    method: 'GET',
    pre: [
      middlewares.isAuth.bind(middlewares)
    ],
    handler: userController.getUser.bind(userController)
  },
  {
    path: '/user/add',
    method: 'POST',
    pre: [
      middlewares.isAuth.bind(middlewares)
    ],
    handler: userController.addUser.bind(userController),
    responseStatus: 201
  },
  {
    path: '/user/update/:id',
    method: 'PATCH',
    pre: [
      middlewares.isAuth.bind(middlewares)
    ],
    handler: userController.updateUser.bind(userController)
  },
  {
    path: '/user/delete/:id',
    method: 'DELETE',
    pre: [
      middlewares.isAuth.bind(middlewares)
    ],
    handler: userController.deleteUser.bind(userController)
  },
  {
    path: '/user/login',
    method: 'POST',
    pre: [
      middlewares.isNotAuth.bind(middlewares)      
    ],
    handler: authController.handleLogin.bind(authController)
  },
  {
    path: '/user/register',
    method: 'POST',
    pre: [
      middlewares.isNotAuth.bind(middlewares)
    ],
    handler: authController.handleRegister.bind(authController)
  },
  {
    path: '/user/logout',
    method: 'GET',
    pre: [
      middlewares.isNotAuth.bind(middlewares)
    ],
    handler: authController.handleLogout.bind(authController)
  }
];

export default createRouter(routes);
