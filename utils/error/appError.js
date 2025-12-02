const { responseStatus } = require("../responseStatus");

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? responseStatus.FAIL : responseStatus.ERROR;
        this.isOperational = true;

        Error.captureStackTrace(this, this.construtor);
    }
}

module.exports = AppError;