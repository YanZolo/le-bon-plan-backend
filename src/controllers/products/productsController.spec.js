const { v4 } = require("uuid")
// length of uuid v4() = 36
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
    describe('getProduct()', () => {
        it('should not return an empty array', () => {
            // given 
            const productsController = new ProductsController();
            productsController.saveProduct({
                title: 'my Product1'
            });
            // when
            const result = productsController.getProducts()
            // then 
            expect(result.length).toBeGreaterThan(0);
        })
    })
    describe('saveProduct()', () => {
        test('it should save one product',  () => {
            // given
            const productsController = new ProductsController()
           
            // when
            const result = productsController.saveProduct({                
                title: 'my Product'
            })            
            // then
            expect(result).toMatchObject({
                _id: expect.any(String),
                title: 'my Product'
            })       
        })
    })
    
   
})
