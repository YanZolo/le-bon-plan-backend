import productModel from '../../models/productModel.js';
import { ProductsController } from './productsController.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';


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
      expect(productModel.findById as jest.Mock).toHaveBeenCalledWith('gjdkgjdsglksdjg');
    });

    it('should throw product error not found', async () => {
      // given
      const productController = new ProductsController();
      (productModel.findById as jest.Mock).mockResolvedValue("undefined");
      // when
      let actualError;
      try {
        await productController.getProduct({
          params: { id: 'gjdkgjdsglksdjg' }
        } as any);
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
      // when
      const result = await productController.addProduct({
        body: {
          price: 44,
          title: 'product 123'
          // unknown: "prop",
        }
      });
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
        params: { id: 'some-id' },
        body: { title: 'new test updateProduct()', price: 47 }
      });
      // then
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
      // given
      const productController = new ProductsController();
      productModel.findById.mockResolvedValue({
        _id: 'some_id_123',
        title: 'test deleteProduct()',
        price: 99
      });
      // when
      const productToDelete = productController.getProduct({
        params: { id: 'some_id_123' }
      });
      // const deleteOne = jest.fn().mockResolvedValue();
      productModel.mockImplementation(() => {
        return {
          deleteOne: jest.fn().mockResolvedValue()
        };
      });
      const result = await productController.deleteProduct({
        params: { _id: productToDelete._id }
      });
      // then
      expect(productModel.findById).toHaveBeenCalledWith('some_id_123');
      expect(result).toEqual();
      expect(productModel.deleteOne).toHaveBeenCalledTimes(1);
      expect(productModel.deleteOne).toHaveBeenCalledWith({
        _id: 'some_id_123'
      });
    });
  });
});
