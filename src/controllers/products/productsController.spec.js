const { ProductsController } = require("./productsController")

describe('ProductsController', () => {
    describe('getProducts()', () => {
        test('it should return an empty list', () => {
            // GIVEN
            const productsController = new ProductsController()

            // WHEN
            const result = productsController.getProducts()

            // THEN
            expect(result).toEqual([])
        })
    })
    describe('saveProduct()', () => {
        test('it should return an object with two properties (id and title)', () => {
            //GIVEN
            const productsController2 = new ProductsController()
                jest.mock('uuid');
                const uuidSpy = jest.spyOn(v4(), 'v4');

            // WHEN
            const result2 = productsController2.saveProduct({
                title: "test"
            })

            //THEN

            expect(result2).toEqual({
                title: "test"
            });
                expect(uuidSpy).toHaveBeenCalledTimes(1);
            
        })

    })
})
