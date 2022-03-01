import { UserController }from './usersController';

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
    })
    describe('getUser()', () => {
        it('should not return user by id', () => {
            // given
            const userController = new UserController()
            // when
            const newUser = userController.saveUser({
                username: 'romain'
            })
            const result = userController.getUser({
               _id: newUser._id
            })    
            // then
            expect(result).toMatchObject({
                _id: newUser._id,
                username: 'romain'
            })
        })
    })

    describe('saveUser()', () => {
        it('should save new user', () => {
            // GIVEN 
            const userController = new UserController();
            // WHEN
            const newUser = userController.saveUser({
                username: 'sofiane'
            });
            const result = userController.getAllUsers().filter(user => user.username === newUser.username);
            // THEN
            expect(result[0]).toMatchObject({
                _id: newUser._id,
                username: 'sofiane'
            })
        })
    })

    describe('updateUser()', () => {
        it('should update user ', () => {
            // given
            const userController = new UserController()
            const newUser = userController.saveUser({
                username: 'zenika'
            })
            const user = userController.getUser({
                _id: newUser._id
            })
            // when
            const result = userController.updateUser({
                _id: newUser._id,
                username: 'ZENIKA'
            })
            // then
            expect(result).toMatchObject({
                _id: newUser._id,
                username: 'ZENIKA'
            })
        })
    })

    describe('deleteUser()', () => {
        it('should delete a given user', () => {
            // given
            const userController = new UserController();
            const newUser = userController.saveUser({
                username: 'username to delete'
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
});