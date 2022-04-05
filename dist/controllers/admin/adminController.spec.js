import UserModel from '../../models/userModel.js';
import { AdminController } from './adminController.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
jest.mock('../../models/userModel.js');
describe('adminController', () => {
  beforeEach(() => {
    UserModel.findById.mockClear();
  });
  describe('addUser()', () => {
    it('it should add a user', async () => {
      const adminController = new AdminController();
      const save = jest.fn(() => {
        return {
          _id: 'some id addUser',
          username: 'test addUser',
          email: 'test@addUser.com',
          password: 'test password'
        };
      });
      UserModel.mockImplementation(() => {
        return {
          save
        };
      });
      const result = await adminController.addUser({
        body: {
          username: 'test addUser',
          email: 'test@addUser.com',
          password: 'test password'
        }
      });
      expect(UserModel).toHaveBeenCalledWith({
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
});
//# sourceMappingURL=adminController.spec.js.map