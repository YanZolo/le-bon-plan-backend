import userModel from '../../models/userModel.js';
import { UserController } from './usersController.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
jest.mock('../../models/userModel.js');
describe('useController', () => {
  beforeEach(() => {
    userModel.findById.mockClear();
  });
  describe('getAllUsers()', () => {
    it('should return an empty array', async () => {
      const userController = new UserController();
      userModel.find.mockResolvedValue([]);
      const result = await userController.getAllUsers();
      expect(result).toEqual([]);
    });
  });
  describe('getUser()', () => {
    it('should return one user', async () => {
      const userController = new UserController();
      userModel.findById.mockResolvedValue([{
        username: 'soso'
      }]);
      const result = await userController.getUser({
        params: {
          id: 'kjglmdfk'
        }
      });
      expect(result).toEqual([{
        username: 'soso'
      }]);
      expect(userModel.findById).toHaveBeenCalledWith('kjglmdfk');
    });
    it("should throw 'User Not Found'", async () => {
      const userController = new UserController();
      userModel.findById.mockResolvedValue(undefined);
      let currentError;

      try {
        await userController.getUser({
          params: {
            id: 'kjjfdfdfdkf'
          }
        });
      } catch (error) {
        currentError = error;
      }

      expect(currentError.message).toEqual('User Not Found');
      expect(currentError.status).toEqual(404);
      expect(currentError.name).toEqual('NOT_FOUND');
    });
  });
  describe('addUser()', () => {
    it('should add new user in database', async () => {
      const userController = new UserController();
      const save = jest.fn(() => {
        return {
          _id: 'some id addUser',
          username: 'test addUser',
          email: 'test@addUser.com',
          password: 'test password'
        };
      });
      userModel.mockImplementation(() => {
        return {
          save
        };
      });
      const result = await userController.addUser({
        body: {
          username: 'test addUser',
          email: 'test@addUser.com',
          password: 'test password'
        }
      });
      expect(userModel).toHaveBeenCalledWith({
        username: 'test addUser',
        email: 'test@addUser.com',
        password: 'test password'
      });
      expect(save).toHaveBeenCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: 'some id addUser',
        username: 'test addUser',
        email: 'test@addUser.com',
        password: 'test password'
      });
    });
  });
  describe('udpdateUser()', () => {
    it('should update a user', async () => {
      const userController = new UserController();
      userModel.findById.mockResolvedValue({
        _id: 'some id updateUser',
        username: 'old username',
        email: 'old email',
        password: 'old password'
      });
      const save = jest.fn().mockResolvedValue({
        _id: 'some id updateUser',
        username: 'new username',
        email: 'new email',
        password: 'new password'
      });
      userModel.mockImplementation(() => {
        return {
          save
        };
      });
      const result = await userController.updateUser({
        params: {
          id: 'some id updateUser'
        },
        body: {
          username: 'new username',
          email: 'new email',
          password: 'new password'
        }
      });
      expect(save).toBeCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: 'some id updateUser',
        username: 'new username',
        email: 'new email',
        password: 'new password'
      });
    });
    describe('deleteUser()', () => {
      it('should delete a user', async () => {
        const req = {
          params: {
            id: 'some id updateUser'
          }
        };
        const userController = new UserController();
        jest.spyOn(userController, 'getUser').mockResolvedValue({
          _id: 'some id updateUser',
          username: 'new username',
          email: 'new email',
          password: 'new password'
        });
        const result = await userController.deleteUser(req);
        expect(userController.getUser).toHaveBeenCalledWith(req);
        expect(userModel.deleteOne).toBeCalledTimes(1);
        expect(userModel.deleteOne).toHaveBeenCalledWith({
          _id: 'id deleteUser'
        });
        expect(result).toEqual(undefined);
      });
    });
  });
});
//# sourceMappingURL=usersController.spec.js.map