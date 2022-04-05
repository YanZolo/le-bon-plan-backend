import UserModel from '../../models/userModel.js';
import ProductModel from '../../models/productModel.js';
// import UserNotFound from '../../errors/UserNotFound';
// import ProductNotFound from '../../errors/ProductNotFound';
import { AdminController } from './adminController.js';
// import { UserController } from '../users/usersController';
// import { ProductsController } from '../products/productsController.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Request } from 'express';

jest.mock('../../models/userModel.js');
// jest.mock('../../models/productModel.ts');

describe('adminController', () => {
    beforeEach(() => {
        (UserModel.findById as jest.Mock).mockClear();
    })
    describe('addUser()', () => {
        it('it should add a user', async () => {

            //GIVEN
            const adminController = new AdminController();
            const save = jest.fn(() => {
                return {
                    _id: 'some id addUser',
                    username: 'test addUser',
                    email: 'test@addUser.com',
                    password: 'test password'
                }
            });
            (UserModel as jest.MockedFunction<any>).mockImplementation(() => {
                return {
                    save
                }
            })
            //WHEN
            const result = await adminController.addUser({
                body: {
                    username: 'test addUser',
                    email: 'test@addUser.com',
                    password: 'test password'
                }
            } as Request<{ username: string, email: string, password: string }>)
            //THEN
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
        })
    })
})