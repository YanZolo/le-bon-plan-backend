import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound.js';
import { Request } from 'express';

interface UserDocument {
  _id: {};
  username: string;
  email: string;
  password?: string;
}
export class UserController {
  // return all users
  async getAllUsers(): Promise<UserDocument[]> {
    return UserModel.find();
  }

  async getUser({ params: { id } }: Request): Promise<UserDocument> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }

  async addUser({ body: { username, email } }: Request): Promise<UserDocument> {
    const newUser = new UserModel({
      username,
      email
    });
    return newUser.save();
  }

  async updateUser(req: Request): Promise<UserDocument> {
    const user = await this.getUser(req);
    const { username, email } = req.body;
    if (username !== user.username) {
      user.username = username;
    }
    if (email !== user.email) {
      user.email = email;
    }
    const userUpdated = new UserModel(user);
    return await userUpdated.save();
  }

  async deleteUser(req: Request): Promise<void> {
    const user = await this.getUser(req);
    await UserModel.deleteOne({ _id: user._id });
  }
}
