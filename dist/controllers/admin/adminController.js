import UserModel from '../../models/userModel.js';
import ProductModel from '../../models/productModel.js';
import UserNotFound from '../../errors/UserNotFound.js';
import ProductNotFound from '../../errors/ProductNotFound.js';
export class AdminController {
  async addUser({
    body: {
      username,
      email,
      password,
      isAdmin
    }
  }) {
    const newUser = new UserModel({
      username,
      email,
      password,
      isAdmin
    });
    return newUser.save();
  }

  async addProduct({
    body: {
      title,
      price
    }
  }) {
    const newProduct = new ProductModel({
      title,
      price
    });
    return newProduct.save();
  }

  async getAllUsers() {
    return UserModel.find();
  }

  async getAllProducts() {
    return ProductModel.find();
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

  async getProduct({
    params: {
      id
    }
  }) {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new ProductNotFound();
    }

    return product;
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

  async updateProduct(req) {
    const product = await this.getProduct(req);
    const {
      title,
      price
    } = req.body;

    if (title && product.title !== title) {
      product.title = title;
    }

    if (price && product.price !== price) {
      product.price = price;
    }

    const updatedProduct = new ProductModel(product);
    return await updatedProduct.save();
  }

  async deleteUser(req) {
    const user = await this.getUser(req);
    await UserModel.deleteOne({
      _id: user._id
    });
  }

  async deleteProduct(req) {
    const product = await this.getProduct(req);
    await ProductModel.deleteOne({
      _id: product._id
    });
  }

  displayRegisterView(res) {
    return res.render('register');
  }

  displayLoginView(res) {
    return res.render('login');
  }

}
//# sourceMappingURL=adminController.js.map