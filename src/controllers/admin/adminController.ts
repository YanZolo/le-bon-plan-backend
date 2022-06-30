import UserModel from '../../models/userModel.js';
import ProductModel from '../../models/productModel.js';
import UserNotFound from '../../errors/UserNotFound.js';
import ProductNotFound from '../../errors/ProductNotFound.js';
import { Request } from 'express';
import bcrypt from 'bcrypt';

export class AdminController {
  async addUser({
    body: { username, email, password, isAdmin }
  }: Request<
    any,
    any,
    { username: string; email: string; password: string; isAdmin: boolean }
  >) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });
    return newUser.save();
  }

  async getAllUsers() {
    return UserModel.find();
  }
  async getAllProducts() {
    return ProductModel.find();
  }

  async getUser({ params: { id } }: Request<{ id: string }>) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new UserNotFound();
    }
    // req.user = user;  how to pass user in req.user with typescript
    return user;
  }
  async getProduct({ params: { id } }: Request<{ id: string }>) {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new ProductNotFound();
    }
    return product;
  }

  async updateUser(
    req: Request<
      { id: string },
      any,
      {
        username?: string;
        email?: string;
        password?: string;
        isAdmin?: boolean;
      }
    >
  ) {
    const user = await this.getUser(req);
    const { username, email, password, isAdmin } = req.body;
    if (username && username !== user.username) {
      user.username = username;
    }
    if (email && email !== user.email) {
      user.email = email;
    }
    if (password && (await bcrypt.compare(password, user.password)) === false) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      console.log('user.password ===>', user.password);
    }
    if (isAdmin && isAdmin !== user.isAdmin) {
      user.isAdmin = isAdmin;
    }
    const userUpdated = new UserModel(user);
    return await userUpdated.save();
  }
  async updateProduct(
    req: Request<{ id: string }, any, { title: string; price: number }>
  ) {
    const product = await this.getProduct(req);
    const { title, price } = req.body;

    if (title && product.title !== title) {
      product.title = title;
    }
    if (price && product.price !== price) {
      product.price = price;
    }
    const updatedProduct = new ProductModel(product);
    return await updatedProduct.save();
  }

  async deleteUser(req: Request<{ id: string }, any, any>) {
    const user = await this.getUser(req);
    await UserModel.deleteOne({ _id: user._id });
  }

  async deleteProduct(req: Request<{ id: string }>) {
    const product = await this.getProduct(req);
    await ProductModel.deleteOne({ _id: product._id });
  }
}
