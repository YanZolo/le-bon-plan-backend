const { Exception } = require("./Exception");

class NotFound extends Exception {
    constructor(message) {
       super(404, message)
    }
}

module.exports.NotFound = NotFound