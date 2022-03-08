import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound.js';

interface UserDocument {
  _id: Object;
  username: String;
  email: String;
  password: String;
}

export class UserController {
  // return all users
  async getAllUsers() : Promise<UserDocument[]>  {
    return  UserModel.find();
  }

  // return one user
  async getUser({ params: { id } }) : Promise<UserDocument> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }

  // add user
  async addUser({ body: { username, email } }) : Promise<UserDocument> {
    const newUser = new UserModel({
      username,
      email
    });
    return newUser.save();
  }

  // update user
  async updateUser(req) : Promise<UserDocument> {
    const user = await this.getUser(req);
    const { username, email } = req.body;
    if (username !== user.username) {
      user.username = username;
    }
    if (email !== user.email) {
      user.email = email;
    }
    const userUpdated = new UserModel(user)
    return await userUpdated.save()
  }

  // remove user
  async deleteUser(req) : Promise<void> {
    const user = await this.getUser(req);
    await UserModel.deleteOne({ _id: user._id });
  }
}
