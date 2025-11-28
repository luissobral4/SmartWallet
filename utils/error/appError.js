const { status } = require("../../enums/status");

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? status.FAIL : status.ERROR;
        this.isOperational = true;

        Error.captureStackTrace(this, this.construtor);
    }
}

module.exports = AppError;