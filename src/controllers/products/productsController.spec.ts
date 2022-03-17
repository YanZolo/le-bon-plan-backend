import productModel from '../../models/productModel.js';
import { ProductsController } from './productsController.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Request } from 'express';

jest.mock('../../models/productModel');

describe('productController', () => {
  beforeEach(() => {
    (productModel.findById as jest.Mock).mockClear();
  });
  describe('getProducts()', () => {
    it('should return empty array', async () => {
      // given
      const productController = new ProductsController();
      (productModel.find as jest.Mock).mockResolvedValue([]);
      // when
      const result = await productController.getProducts();
      // then
      expect(result).toEqual([]);
    });
  });

  describe('getProduct()', () => {
    it('should return a product from productModel', async () => {
      // given
      const productController = new ProductsController();
      (productModel.findById as jest.Mock).mockResolvedValue([
        {
          title: 'toto'
        }
      ]);
      // when
      const result = await productController.getProduct({
        params: { id: 'gjdkgjdsglksdjg' }
      } as any);
      // then
      expect(result).toEqual([
        {
          title: 'toto'
        }
      ]);
      expect(productModel.findById as jest.Mock).toHaveBeenCalledWith(
        'gjdkgjdsglksdjg'
      );
    });

    it('should throw product error not found', async () => {
      // given
      const productController = new ProductsController();
      (productModel.findById as jest.Mock).mockResolvedValue(null);
      // when
      let actualError: any;
      try {
        await productController.getProduct({
          params: { id: 'gjdkgjdsglksdjg' }
        } as Request<{ id: string }>);
      } catch (error) {
        actualError = error;
      }
      // then
      expect(actualError.message).toEqual('Product Not Found');
      expect(actualError.status).toEqual(404);
      expect(actualError.name).toEqual('NOT_FOUND');
    });
  });

  describe('addProduct()', () => {
    it('should add a new product in database', async () => {
      // given
      const productController = new ProductsController();
      const save = (jest.fn() as jest.Mock).mockResolvedValue({
        _id: 'id',
        price: 44,
        title: 'product 123'
      });
      (productModel as jest.MockedFunction<any>).mockImplementation(() => {
        return {
          save
        };
      });
      // when
      const result = await productController.addProduct({
        body: {
          price: 44,
          title: 'product 123'
        }
      } as Request<{ price: number; title: string }>);
      // then
      expect(productModel).toHaveBeenCalledWith({
        price: 44,
        title: 'product 123'
      });
      expect(save).toHaveBeenCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: 'id',
        price: 44,
        title: 'product 123'
      });
    });
  });

  describe('updateProduct()', () => {
    it('should update a product', async () => {
      // given
      const productController = new ProductsController();
      (productModel.findById as jest.Mock).mockResolvedValue({
        _id: 'some-id',
        title: 'old test updateProduct()',
        price: 47
      });
      const save = (jest.fn() as jest.Mock).mockResolvedValue({
        _id: 'some-id',
        title: 'new test updateProduct()',
        price: 86
      });
      (productModel as jest.MockedFunction<any>).mockImplementation(() => {
        return {
          save
        };
      });
      // when
      const result = await productController.updateProduct({
        params: { id: 'some-id' },
        body: { title: 'new test updateProduct()', price: 47 }
      } as Request<{ id: string }, any, { title: string; price: number }>);
      // then
      expect(productModel.findById).toHaveBeenCalledWith('some-id');
      expect(save).toBeCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: 'some-id',
        title: 'new test updateProduct()',
        price: 86
      });
    });
  });

  describe('deleteProduct()', () => {
    it('should delete a product', async () => {
      // given
      const req = {
        params: { id: 'some_id_123' }
      };

      const productController = new ProductsController();
      jest.spyOn(productController, 'getProduct').mockResolvedValue({
        _id: 'some_id_123',
        title: 'test deleteProduct()',
        price: 99
      } as any);

      // when
      const result = await productController.deleteProduct(
        req as Request<{ id: string }>
      );

      // then
      expect(productController.getProduct).toHaveBeenCalledWith(req);
      expect(result).toEqual(undefined);
      expect(productModel.deleteOne).toHaveBeenCalledTimes(1);
      expect(productModel.deleteOne).toHaveBeenCalledWith({
        _id: 'some_id_123'
      });
    });
  });
});
