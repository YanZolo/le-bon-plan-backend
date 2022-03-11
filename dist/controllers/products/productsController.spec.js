import productModel from '../../models/productModel.js';
import { ProductsController } from './productsController.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
jest.mock('../../models/productModel');
describe('productController', () => {
  beforeEach(() => {
    productModel.findById.mockClear();
  });
  describe('getProducts()', () => {
    it('should return empty array', async () => {
      const productController = new ProductsController();
      productModel.find.mockResolvedValue([]);
      const result = await productController.getProducts();
      expect(result).toEqual([]);
    });
  });
  describe('getProduct()', () => {
    it('should return a product from productModel', async () => {
      const productController = new ProductsController();
      productModel.findById.mockResolvedValue([{
        title: 'toto'
      }]);
      const result = await productController.getProduct({
        params: {
          id: 'gjdkgjdsglksdjg'
        }
      });
      expect(result).toEqual([{
        title: 'toto'
      }]);
      expect(productModel.findById).toHaveBeenCalledWith('gjdkgjdsglksdjg');
    });
    it('should throw product error not found', async () => {
      const productController = new ProductsController();
      productModel.findById.mockResolvedValue(undefined);
      let actualError;

      try {
        await productController.getProduct({
          params: {
            id: 'gjdkgjdsglksdjg'
          }
        });
      } catch (error) {
        actualError = error;
      }

      expect(actualError.message).toEqual('Product Not Found');
      expect(actualError.status).toEqual(404);
      expect(actualError.name).toEqual('NOT_FOUND');
    });
  });
  describe('addProduct()', () => {
    it('should add a new product in database', async () => {
      const productController = new ProductsController();
      const save = jest.fn().mockResolvedValue({
        _id: 'id',
        price: 44,
        title: 'product 123'
      });
      productModel.mockImplementation(() => {
        return {
          save
        };
      });
      const result = await productController.addProduct({
        body: {
          price: 44,
          title: 'product 123'
        }
      });
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
      const productController = new ProductsController();
      productModel.findById.mockResolvedValue({
        _id: 'some-id',
        title: 'test updateProduct()',
        price: 46
      });
      const save = jest.fn().mockResolvedValue({
        _id: 'some-id',
        title: 'new test updateProduct()',
        price: 47
      });
      productModel.mockImplementation(() => {
        return {
          save
        };
      });
      const result = await productController.updateProduct({
        params: {
          id: 'some-id'
        },
        body: {
          title: 'new test updateProduct()',
          price: 47
        }
      });
      expect(productModel.findById).toHaveBeenCalledWith('some-id');
      expect(save).toBeCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: 'some-id',
        title: 'new test updateProduct()',
        price: 47
      });
    });
  });
  describe('deleteProduct()', () => {
    it('should delete a product', async () => {
      const req = {
        params: {
          id: 'some_id_123'
        }
      };
      const productController = new ProductsController();
      jest.spyOn(productController, 'getProduct').mockResolvedValue({
        _id: 'some_id_123',
        title: 'test deleteProduct()',
        price: 99
      });
      const result = await productController.deleteProduct(req);
      expect(productController.getProduct).toHaveBeenCalledWith(req);
      expect(result).toEqual(undefined);
      expect(productModel.deleteOne).toHaveBeenCalledTimes(1);
      expect(productModel.deleteOne).toHaveBeenCalledWith({
        _id: 'some_id_123'
      });
    });
  });
});
//# sourceMappingURL=productsController.spec.js.map