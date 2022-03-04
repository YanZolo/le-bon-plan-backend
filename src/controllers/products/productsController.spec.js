import productModel from '../../models/productModel.js';
import { ProductsController } from './productsController.js';
import { jest, describe, it, expect, beforeEach} from '@jest/globals';

// jest.mock('../../models/productModel');

jest.mock('../../models/productModel');

describe('productController', () => {
  beforeEach(()=>{
    productModel.findById.mockClear()
  })
  describe('getProducts()', () => {
    it('should return empty array', async () => {
      // given
      const productController = new ProductsController();
      productModel.find.mockResolvedValue([]);
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
      productModel.findById.mockResolvedValue([
        {
          title: 'toto'
        }
      ]);
      // when
      const result = await productController.getProduct({
        params: { id: 'gjdkgjdsglksdjg' }
      });
      // then
      expect(result).toEqual([
        {
          title: 'toto'
        }
      ]);
      expect(productModel.findById).toHaveBeenCalledWith('gjdkgjdsglksdjg');      
    });

    it('should throw product error not found', async () => {
      // given
      const productController = new ProductsController();
      productModel.findById.mockResolvedValue();
      // when
      let actualError;
      try {
        await productController.getProduct({
          params: { id: 'gjdkgjdsglksdjg' }
        });
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
        price: 46
      });
      productModel.mockImplementation(() => {
        return {
          save
        };
      });
      const result = await productController.updateProduct({
        params: { id: 'some-id' },
        body: { title: 'new test updateProduct()', price: 46 }
      });
      // then
      expect(productModel.findById).toHaveBeenCalledWith('some-id');
      expect(save).toBeCalled();
      expect(save).toHaveReturned();
      expect(result).toEqual({
        _id: 'some-id',
        title: 'new test updateProduct()',
        price: 46
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
      const deleteOne = jest.fn().mockResolvedValue();
      productModel.deleteOne.getMockImplementation(() => {
        return {
          deleteOne
        };
      });
      const result = await productController.deleteProduct({
        params: { _id: productToDelete._id }
      });
      // then
      console.log(result);
      expect(productModel.findById).toHaveBeenCalledWith('some_id_123')
      expect(result).toEqual();
      expect(productModel.deleteOne).toHaveBeenCalledWith({
        _id: 'some_id_123'
      });
    });
  });
});
