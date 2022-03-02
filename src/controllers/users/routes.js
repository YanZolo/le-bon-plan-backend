import { UserController } from './usersController.js';
import { createRouter } from '../../utils/createRouter.js';
const userController = new UserController();

const routes = [
  {
    path: '/',
    method: 'GET',
    handler: userController.getAllUsers.bind(userController)
  },
  {
    path: '/:id',
    method: 'GET',
    handler: userController.getUser.bind(userController)
  },
  {
    path: '/',
    method: 'POST',
    handler: userController.addUser.bind(userController),
    responseStatus: 201
  },
  {
    path: '/:id',
    method: 'PATCH',
    handler: userController.updateUser.bind(userController)
  },
  {
    path: '/:id',
    method: 'DELETE',
    handler: userController.deleteUser.bind(userController)
  }
];

export default createRouter(routes);
