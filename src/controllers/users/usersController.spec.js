const { UserController } = require('./usersController');

describe('userController', () => {
    describe('getAllUsers()', () => {
        it('should return empty array', () => {
            // given
            const userController = new UserController();

            // when

            const result = userController.getAllUsers();
            // then

            expect(result).toEqual([]);
        })
    });
    describe('getUser()', () => {
        it('should not return user by id', () => {
            // given
            const userController = new UserController()

            // when
            const newUser = userController.saveUser({
                name: 'romain'
            })
            const result = userController.getUser({
               _id: newUser._id
            })
    
            // then
            expect(result).toMatchObject({
                _id: newUser._id,
                name: 'romain'
            })
        })
    })

    describe('saveUser()', () => {
        it('should save new user', () => {
            // GIVEN 
            const userController = new UserController();

            // WHEN
            const newUser = userController.saveUser({
                name: 'sofiane'
            });
            const result = userController.getAllUsers().filter(user => user.name === newUser.name);// i filter by name but need to refactor with id or email because id and email are unique

            // THEN
            expect(result[0]).toMatchObject({
                _id: newUser._id,
                name: 'sofiane'
            });
        });
    });
    describe('updateUser()', () => {
        it('should update user ', () => {
            // given
            const userController = new UserController()
            const newUser = userController.saveUser({
                name: 'zenika'
            })
            const user = userController.getUser({
                _id: newUser._id
            })
            // when
            const result = userController.updateUser({
                _id: newUser._id,
                name: 'ZENIKA'
            })
            // then
            expect(result).toMatchObject({
                _id: newUser._id,
                name: 'ZENIKA'
            });
        });
    });
    describe('deleteUser()', () => {
        it('should delete a given user', () => {
            // given
            const userController = new UserController();
            const newUser = userController.saveUser({
                name: 'name to delete'
            });
            // when
            userController.deleteUser({
                _id: newUser._id
            });
            const result = userController.getUser({
                _id: newUser._id
            });
            // then
            expect(result).toEqual(expect.not.objectContaining(newUser))
        })
    })

})