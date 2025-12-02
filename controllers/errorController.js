const { environmentType } = require('../enums/environmentType');
const { errorType } = require('../utils/error/errorType');
const { responseStatus } = require('../utils/responseStatus');
const AppError = require('../utils/error/appError');
const ErrorMessages = require('../utils/messages/errorMessages');
const { responseStatusCode } = require('../utils/responseStatusCode');

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

        res.status(responseStatusCode.INTERNAL_SERVER_ERROR).json({
            status: responseStatus.ERROR,
            message: ErrorMessages.somethingWentWrongMessage
        });
    }
};

const handleJWTErrorDB = () =>
    new AppError(ErrorMessages.invalidTokenMessage, responseStatusCode.UNAUTHORIZED);

const handleJWTExpiredErrorDB = () =>
    new AppError(ErrorMessages.expiredTokenMessage, responseStatusCode.UNAUTHORIZED);

const handleCastErrorDB = (err) => {
    const message = ErrorMessages.invalidMessage(err.path, err.value);

    return new AppError(message, responseStatusCode.BAD_REQUEST);
};

const handleDuplicatedFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = ErrorMessages.duplicatedFieldMessage(value);

    return new AppError(message, responseStatusCode.BAD_REQUEST);
};

const handleValidatorErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = ErrorMessages.invalidIbputDataMessage(errors);

    return new AppError(message, responseStatusCode.BAD_REQUEST);
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || responseStatusCode.INTERNAL_SERVER_ERROR;
    err.status = err.status || responseStatus.ERROR;

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