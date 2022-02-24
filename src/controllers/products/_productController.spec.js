import productModel from '../../models/productModel.js';
import { ProductController } from './_productController.js';
import {jest} from '@jest/globals';

jest.mock('../../models/productModel');

describe("productController", () => {
    describe("getProducts()", () => {
        it("should return empty array", async () => {
            // given
            const productController = new ProductController();
            productModel.find.mockResolvedValue([]);
            // when
            const result = await productController.getProducts();
            // then

            expect(result).toEqual([])
        });
    });
    describe("getProduct()", () => {
        it("should return a product from productModel", async () => {
            // given 
            const productController = new ProductController();
            productModel.findById.mockResolvedValue([{
                title: "toto"
            }])
            // when
            const result = await productController.getProduct({ params: { id: 'gjdkgjdsglksdjg' } })
            // then

            expect(result).toEqual([{
                title: "toto"
            }])
            expect(productModel.findById).toHaveBeenCalledWith("gjdkgjdsglksdjg")
        })
        it("should throw product error not found", async () => {
            // given 
            const productController = new ProductController();
            productModel.findById.mockResolvedValue()
            // when
            let actualError;
            try {
                await productController.getProduct({ params: { id: 'gjdkgjdsglksdjg' } })
            } catch (error) {
                actualError = error;
            }
            // then

            expect(actualError.message).toEqual("Product not found")
            expect(actualError.status).toEqual(404)
            expect(actualError.name).toEqual("NOT_FOUND")
        })
    })
    describe("addProduct()", () => {
        it("should add a new product", async () => {
            // given
            const productController = new ProductController();
            const save = jest.fn().mockResolvedValue({
                _id: 'id',
                price: 44,
                title: "product 123",
            })

            productModel.mockImplementation(() => {
                return {
                    save
                }
            })

            // when 
            const result = await productController.addProduct({
                body: {
                    price: 44,
                    title: "product 123",
                    unknown: "prop"
                }
            })


            // then
            expect(productModel).toHaveBeenCalledWith({
                price: 44,
                title: "product 123"
            })
            expect(result).toEqual({
                _id: 'id',
                price: 44,
                title: "product 123",
            })
        })
    })
});
