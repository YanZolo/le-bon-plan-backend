import userModel from '../../models/userModel.js';
import { UserController } from './usersController.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Request} from 'express'
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
      } as Request<{id: string}>);
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
      (userModel.findById as jest.Mock).mockResolvedValue("undefined");
      // WHEN
      let currentError;
      try {
        await userController.getUser({ params: { id: 'kjjfdfdfdkf' } } as Request<{id: string}>);
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
          email: 'test@addUser.com'
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
          email: 'test@addUser.com'
        }
      } as Request<{username: string, email: string}>);
      // then
      expect(userModel).toHaveBeenCalledWith({
        username: 'test addUser',
        email: 'test@addUser.com'
      });
      expect(save).toHaveBeenCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: 'some id addUser',
        username: 'test addUser',
        email: 'test@addUser.com'
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
        email: 'old email'
      });
      const save = (jest.fn() as jest.MockedFunction<any>).mockResolvedValue({
        _id: 'some id updateUser',
        username: 'new username',
        email: 'new email'
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
          email: 'new email'
        }
      } as Request<{id: string},any,{username:string, email:string}>); // À voir avec Romain
      // then
      expect(save).toBeCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: 'some id updateUser',
        username: 'new username',
        email: 'new email'
      });
    });

    describe('deleteUser()', () => {
      it('should delete a user', async () => {
        // given
        const userController = new UserController();
        (userModel.findById as jest.Mock).mockResolvedValue({
          _id: 'id deleteUser',
          username: 'username to delete',
          email: 'email to delete'
        });
        const deleteOne =( jest
          .fn()as jest.MockedFunction<any>)// À voir avec Romain
          .mockResolvedValue(null) // ask Romain return is null?
          .mockImplementation(() => {
            return {
              deleteOne
            };
          });
        // userModel.mockImplementation(() => {
        //   return {
        //     deleteOne
        //   }
        // })
        // when
        const result = await userController.deleteUser({
          params: { id: 'id deleteUser' }
        }as Request<{id: string}>);
        // then
        expect(userModel.deleteOne).toBeCalledTimes(1);
        expect(userModel.deleteOne).toHaveBeenCalledWith({
          _id: 'id deleteUser'
        });
        expect((result as jest.MockedFunction<any>)).toEqual(null); // ask Romain about type of the return
      });
    });
  });
});
