const { environmentType } = require('../enums/environmentType');
const { errorType } = require('../enums/errorType');
const { status } = require('../enums/status');
const AppError = require('../utils/error/appError');
const ErrorMessages = require('../utils/error/errorMessages');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        console.error('ERROR', err);

        res.status(500).json({
            status: status.ERROR,
            message: ErrorMessages.somethingWentWrongMessage
        });
    }
};

const handleJWTErrorDB = () =>
    new AppError(ErrorMessages.invalidTokenMessage, 401);

const handleJWTExpiredErrorDB = () =>
    new AppError(ErrorMessages.expiredTokenMessage, 401);

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;

    return new AppError(message, 400);
};

const handleDuplicatedFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = ErrorMessages.duplicatedFieldMessage(value);

    return new AppError(message, 400);
};

const handleValidatorErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = ErrorMessages.invalidIbputDataMessage(errors);

    return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || status.ERROR;

    if (process.env.NODE_ENV === environmentType.DEVELOPMENT) {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === environmentType.PRODUCTION) {
        let error = { ...err };
        if (err.name === errorType.CAST_ERROR) error = handleCastErrorDB(err);
        if (err.code === 11000) error = handleDuplicatedFieldsDB(err);
        if (err.name === errorType.VALIDATION_ERROR) error = handleValidatorErrorDB(err);
        if (err.name === errorType.JWT_ERROR) error = handleJWTErrorDB();
        if (err.name === errorType.JWT_EXPIRED_ERROR) error = handleJWTExpiredErrorDB();

        sendErrorProd(error, res);
    }
};