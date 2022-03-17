import UserModel from '../../models/userModel.js';
import UserNotFound from '../../errors/UserNotFound.js';
import { Request } from 'express';

export class UserController {
  // return all users
  async getAllUsers() {
    return UserModel.find();
  }

  async getUser({ params: { id } }: Request<{ id: string }>) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new UserNotFound();
    }
    // req.user = user;  how to pass user in req.user with typescript
    return user;
  }

  async addUser({
    body: { username, email, password }
  }: Request<any, any, { username: string; email: string; password: string }>) {
    const newUser = new UserModel({
      username,
      email,
      password
    });
    return newUser.save();
  }

  async updateUser(
    req: Request<
      any,
      any,
      { username: string; email: string; password: string }
    >
  ) {
    const user = await this.getUser(req);
    const { username, email, password } = req.body;
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

  async deleteUser(req: Request<{ id: string }, any, any>) {
    const user = await this.getUser(req);
    await UserModel.deleteOne({ _id: user._id });
  }
}
