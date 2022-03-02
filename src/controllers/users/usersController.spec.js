import userModel from '../../models/userModel.js';
import { UserController } from './usersController.js';

jest.mock('../../models/userModel.js');

describe('useController', () => {
  describe('getAllUsers()', () => {
    it('should return an empty array', async () => {
      // given
      const userController = new UserController();
      userModel.find.mockResolvedValue([]);
      // when
      const result = await userController.getAllUsers();
      // then
      expect(result).toEqual([]);
    });
  });
  describe('getUser()', () => {
    it('should return one user', async () => {
      // given
      const userController = new UserController();
      userModel.findById.mockResolvedValue([
        {
          username: 'soso'
        }
      ]);
      // when
      const result = await userController.getUser({
        params: { id: 'kjglmdfk' }
      });
      // then
      expect(result).toEqual([
        {
          username: 'soso'
        }
      ]);
      expect(userModel.findById).toHaveBeenCalledWith('kjglmdfk');
    });
    it("should throw 'User Not Found'", async () => {
      // GIVEN
      const userController = new UserController();
      userModel.findById.mockResolvedValue();
      // WHEN
      let currentError;
      try {
        await userController.getUser({ params: { id: 'kjjfdfdfdkf' } });
      } catch (error) {
        currentError = error;
      }
      // THEN
      expect(currentError.message).toEqual('User Not Found');
      expect(currentError.status).toEqual(404);
      expect(currentError.name).toEqual('NOT_FOUND');
    });
  });

  describe('addUser()', () => {
    it('should add new user in database', async () => {
      // given
      const userController = new UserController();
      const save = jest.fn(() => {
        return {
          _id: 'some id',
          username: 'test addUser',
          email: 'test@addUser.com'
        };
      });
      userModel.mockImplementation(() => {
        return {
          save
        };
      });
      // when
      const result = await userController.addUser({
        body: {
          username: 'test addUser',
          email: 'test@addUser.com'
        }
      });
      // then
      expect(userModel).toHaveBeenCalledWith({
        username: 'test addUser',
        email: 'test@addUser.com'
      });
      expect(result).toEqual({
        _id: 'some id',
        username: 'test addUser',
        email: 'test@addUser.com'
      });
    });
  });
});
