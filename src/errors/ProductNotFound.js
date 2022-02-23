const { NotFound } = require("./NotFound");

class ProductNotFound extends NotFound {
    constructor() {
        super("Product not found")
    }
}

module.exports.ProductNotFound = ProductNotFound