const statuses = require('statuses')
const {constantCase} = require('change-case')

class Exception extends Error {
    constructor(status, message) {
        super(message);

        this.message = message || statuses(status)
        this.name = constantCase(statuses(status))
        this.status = status
    }
}

module.exports.Exception = Exception

// throw new Exception(400) => {name: 'BAD_REQUEST', message: 'bad request', status: 400}
// throw new Exception(400, "Id is not correct") => {name: 'BAD_REQUEST', message: 'Id is not correct', status: 400}