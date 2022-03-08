import ProductModel from '../../models/productModel.js';
import ProductNotFound from '../../errors/ProductNotFound.js';
import { Request } from 'express';


interface ProductDocument {
  _id?: any;
  title: string;
  price: number;
}
export class ProductsController {
  async getProduct({ params: { id } }: Request): Promise<ProductDocument> {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new ProductNotFound();
    }
    return product;
  }

  async getProducts(): Promise<ProductDocument[]> {
    return ProductModel.find();
  }

  async addProduct({
    body: { title, price }
  }: Request): Promise<ProductDocument> {
    const newProduct = new ProductModel({
      title,
      price
    });
    return newProduct.save();
  }

  async updateProduct(req: Request): Promise<ProductDocument> {
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

  async deleteProduct(req: Request): Promise<void> {
    const product = await this.getProduct(req);
    await ProductModel.deleteOne({ _id: product._id });
  }
}
