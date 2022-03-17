import { UserController } from './usersController.js';
import { createRouter, RoutesOptions } from '../../utils/createRouter.js';
const userController = new UserController();

const routes: RoutesOptions[] = [
  {
    path: '/users/all',
    method: 'GET',
    handler: userController.getAllUsers.bind(userController)
  },
  {
    path: '/user/:id',
    method: 'GET',
    handler: userController.getUser.bind(userController)
  },
  {
    path: '/user/add',
    method: 'POST',
    handler: userController.addUser.bind(userController),
    responseStatus: 201
  },
  {
    path: '/user/update/:id',
    method: 'PATCH',
    handler: userController.updateUser.bind(userController)
  },
  {
    path: '/user/delete/:id',
    method: 'DELETE',
    handler: userController.deleteUser.bind(userController)
  },
  {
    path: '/user/login',
    method: 'POST',
    handler: userController.deleteUser.bind(userController)
  },
  {
    path: '/user/register',
    method: 'POST',
    handler: userController.deleteUser.bind(userController)
  },
  {
    path: '/user/logout',
    method: 'GET',
    handler: userController.deleteUser.bind(userController)
  }
];

export default createRouter(routes);
