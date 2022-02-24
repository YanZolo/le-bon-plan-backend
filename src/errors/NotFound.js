import { Exception } from "./Exception.js";

export class NotFound extends Exception {
    constructor(message) {
       super(404, message)
    }
}

// module.exports.NotFound = NotFound