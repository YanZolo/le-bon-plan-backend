import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound.js';

export class UserController {
  // return all users
  getAllUsers() {
    return UserModel.find();
  }

  // return one user
  async getUser({ params: { id } }) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }

  // add user
  async addUser({ body: { username, email } }) {
    const newUser = new UserModel({
      username,
      email
    });
    return newUser.save();
  }

  // update user
  async updateUser(req) {
    const user = await this.getUser(req);
    const { username, email } = req.body;
    if (username !== user.username) {
      user.username = username;
    }
    if (email !== user.email) {
      user.email = email;
    }
    return user.save();
  }

  // remove user
  async deleteUser(req) {
    const user = await this.getUser(req);
    await UserModel.deleteOne({ _id: user._id });
  }
}
