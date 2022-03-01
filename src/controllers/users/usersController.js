import {v4} from 'uuid';
export class UserController {
    #users = [];

    getAllUsers() {
        return this.#users;
    };
    getUser({_id}) {
        const user = this.#users.filter(user => user._id === _id)[0];
        return user;
    };
   saveUser(user) {
       const newUser = {
           _id: user._id || v4(),
           username: user.username
       };
       this.#users.push(newUser);
       return newUser;
   };
   updateUser({_id, username}) {
    const user = this.#users.filter(user => user._id === _id)[0];
    if(user){
        const indexUser = this.#users.indexOf(user);    
        this.#users[indexUser].username = username;
        return user;
    };
     throw new Error('User Not Found !');
   };
   deleteUser({_id}) {
       const user = this.#users.filter(user => user._id === _id)[0];
       if(user) {
           const userIndex = this.#users.indexOf(user);
           delete this.#users[userIndex];
           return user;
       };
       throw new Error('User Not Found !');
   };
};
