const { v4 } = require("uuid")
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

    describe('updateProduct()', () => {
        test('it should update a product', () => {
            // given
            const productsController = new ProductsController();
            // when
             productsController.saveProduct({
                title: 'macBook PRO'
            });  
            const listProducts = productsController.getProducts(); 

            const id = listProducts[0]._id

            const result = productsController.updateProduct(({id,title: 'new MacBook PRO'}))

            // then 
            expect(result).toMatchObject({
                _id: id,
                title: 'new MacBook PRO'
            })

        } )
    })
    
   
})
