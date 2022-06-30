import { UserController } from './usersController.js';
import { createRouter, RoutesOptions } from '../../utils/createRouter.js';
const userController = new UserController();

const routes: RoutesOptions[] = [
  {
    path: '/user',
    method: 'GET',
    handler: userController.getAllUsers.bind(userController)
  },
  {
    path: '/user/:id',
    method: 'GET',
    handler: userController.getUser.bind(userController)
  },
  {
    path: '/user',
    method: 'POST',
    handler: userController.addUser.bind(userController),
    responseStatus: 201
  },
  {
    path: '/user/:id',
    method: 'PATCH',
    handler: userController.updateUser.bind(userController)
  },
  {
    path: '/user/:id',
    method: 'DELETE',
    handler: userController.deleteUser.bind(userController)
  }
];

export default createRouter(routes);
