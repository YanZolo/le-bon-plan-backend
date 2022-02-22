const {v4} = require('uuid')
class UserController {
    #users = [];

    getAllUsers() {
        return this.#users;
    };

    getUser({_id}) {
        const user = this.#users.filter(user => user._id === _id)[0];
        return user;
    }

   saveUser(user) {
       const newUser = {
           _id: user._id || v4(),
           name: user.name
       };
       this.#users.push(newUser)
       return newUser
   }


   updateUser({_id, name}) {
    const user = this.#users.filter(user => user._id === _id)[0];
    if(user){
        const indexUser = this.#users.indexOf(user);    
        this.#users[indexUser].name = name;
        return user;
    }
     throw new Error('User Not Found !')
   }

   deleteUser({_id}) {
       const user = this.#users.filter(user => user._id === _id)[0];
       if(user) {
           const userIndex = this.#users.indexOf(user);
           delete this.#users[userIndex];
           return user;
       }
       throw new Error('User Not Found !')
   }



}

module.exports = {
    UserController
}