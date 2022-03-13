import userModel from '../../models/userModel.js';
import { UserController } from './usersController.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Request } from 'express';

jest.mock('../../models/userModel.js');

describe('useController', () => {
  beforeEach(() => {
    (userModel.findById as jest.Mock).mockClear();
  });
  describe('getAllUsers()', () => {
    it('should return an empty array', async () => {
      // given
      const userController = new UserController();
      (userModel.find as jest.Mock).mockResolvedValue([]);
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
      (userModel.findById as jest.Mock).mockResolvedValue([
        {
          username: 'soso'
        }
      ]);
      // when
      const result = await userController.getUser({
        params: { id: 'kjglmdfk' }
      } as Request<{ id: string }>);
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
      (userModel.findById as jest.Mock).mockResolvedValue(null);
      // WHEN
      let currentError: any;
      try {
        await userController.getUser({
          params: { id: 'kjjfdfdfdkf' }
        } as Request<{ id: string }>);
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
          _id: 'some id addUser',
          username: 'test addUser',
          email: 'test@addUser.com',
          password: 'test password'
        };
      });
      (userModel as jest.MockedFunction<any>).mockImplementation(() => {
        return {
          save
        };
      });
      // when
      const result = await userController.addUser({
        body: {
          username: 'test addUser',
          email: 'test@addUser.com',
          password: 'test password'
        }
      } as Request<{ username: string; email: string }>);
      // then
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
      // given
      const userController = new UserController();
      (userModel.findById as jest.Mock).mockResolvedValue({
        _id: 'some id updateUser',
        username: 'old username',
        email: 'old email',
        password: 'old password'
      });
      const save = (jest.fn() as jest.Mock).mockResolvedValue({
        _id: 'some id updateUser',
        username: 'new username',
        email: 'new email',
        password: 'new password'
      });
      (userModel as jest.MockedFunction<any>).mockImplementation(() => {
        return {
          save
        };
      });
      // when
      const result = await userController.updateUser({
        params: { id: 'some id updateUser' },
        body: {
          username: 'new username',
          email: 'new email',
          password: 'new password'
        }
      } as Request<{ id: string }, any, { username: string; email: string; password: string }>);
      // then
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
        // given
        const req = {
          params: { id: 'id deleteUser' }
        };
        const userController = new UserController();
        jest.spyOn(userController, 'getUser').mockResolvedValue({
          _id: 'id deleteUser',
          username: 'new username',
          email: 'new email',
          password: 'new password'
        } as any);

        // when
        const result = await userController.deleteUser(
          req as Request<{ id: string }, any, any>
        );

        // then
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
