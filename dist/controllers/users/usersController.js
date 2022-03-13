import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound.js';
export class UserController {
  async getAllUsers() {
    return UserModel.find();
  }

  async getUser({
    params: {
      id
    }
  }) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }

  async addUser({
    body: {
      username,
      email,
      password
    }
  }) {
    const newUser = new UserModel({
      username,
      email,
      password
    });
    return newUser.save();
  }

  async updateUser(req) {
    const user = await this.getUser(req);
    const {
      username,
      email,
      password
    } = req.body;

    if (username && username !== user.username) {
      user.username = username;
    }

    if (email && email !== user.email) {
      user.email = email;
    }

    if (password && password !== user.password) {
      user.password = password;
    }

    const userUpdated = new UserModel(user);
    return await userUpdated.save();
  }

  async deleteUser(req) {
    const user = await this.getUser(req);
    await UserModel.deleteOne({
      _id: user._id
    });
  }

}
//# sourceMappingURL=usersController.js.map