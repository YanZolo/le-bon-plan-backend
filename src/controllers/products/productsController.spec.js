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
        test('it should save new product',  () => {
            // given
            const productsController = new ProductsController()
           
            // when
            const newProduct = productsController.saveProduct({                
                title: 'my Product'
            })       
            const result = productsController.getProducts().filter(product => product.name === newProduct.name) // i filter by the name but need refactor with the id
     
            // then
            expect(result[0]).toMatchObject({
                _id: expect.any(String),
                title: 'my Product'
            })       
        })
    })

    describe('updateProduct()', () => {
        test('it should update a given product', () => {
            // given
            const productsController = new ProductsController();
            // when
             productsController.saveProduct({
                title: 'macBook'
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

    describe('deleteProduct()', () => {
        it('should delete a given product', () => {
            // given
            const productsController =  new ProductsController()
            productsController.saveProduct({
                title: 'new car'
            })    
            const listProducts = productsController.getProducts()
            const product = listProducts.filter(item=>item.title === 'new car')[0]  
            console.log('product :>> ', product);
            const {_id} = product;                
            // when
            productsController.deleteProduct(_id)
            const listProductsAfterDelete = productsController.getProducts()
            // then 
            expect(listProductsAfterDelete).toEqual([])
        })
    })
    
   
})
