import ProductModel from '../../models/productModel.js';
import ProductNotFound from '../../errors/ProductNotFound.js';

export class ProductsController {
  
  async getProduct({ params: { id } }) : Promise<any> {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new ProductNotFound();
    }
    return product;
  }

  async getProducts(): Promise<Object> {
    return ProductModel.find();
  }

  async addProduct({ body: { title, price } }): Promise<any> {
    const newProduct = new ProductModel({
      title,
      price
    });
    return newProduct.save();
  }

  async updateProduct(req): Promise<any> {
    const product = await this.getProduct(req);
    const { title, price } = req.body;

    if (title && product.title !== title) {
      product.title = title;
    }
    if (price && product.price !== price) {
      product.price = price;
    }
    const updatedProduct = new ProductModel(product)
    return await updatedProduct.save();
  }

  async deleteProduct(req): Promise<void> {
    const product = await this.getProduct(req);
    await ProductModel.deleteOne({ _id: product._id });
  }
}
