const {v4} = require('uuid')
class UserController {
    #users = [];

    getAllUsers() {
        return this.#users;
    };

   saveUser(user) {
       const newUser = {
           _id: user._id || v4(),
           name: user.name
       };
       this.#users.push(newUser)
       return newUser
   }


}

module.exports = {
    UserController
}