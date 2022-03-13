import ProductModel from '../../models/productModel.js';
import ProductNotFound from '../../errors/ProductNotFound.js';
import { Request } from 'express';

export class ProductsController {
  async getProduct({ params: { id } }: Request<{ id: string }>) {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new ProductNotFound();
    }
    return product;
  }

  async getProducts() {
    return ProductModel.find();
  }

  async addProduct({
    body: { title, price }
  }: Request<any, any, { title: string, price: string }>) {
    const newProduct = new ProductModel({
      title,
      price
    });
    return newProduct.save();
  }

  async updateProduct(req: Request<{ id: string }, any, { title: string, price: number }>) { 
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

  async deleteProduct(req: Request<{id:string}>) {
    const product = await this.getProduct(req);
    await ProductModel.deleteOne({ _id: product._id });
  }
}
