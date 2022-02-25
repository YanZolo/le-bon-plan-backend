import { NotFound } from "./NotFound.js";

export class ProductNotFound extends NotFound {
    constructor() {
        super("Product not found")
    }
}

