const errorType = Object.freeze({
    CAST_ERROR: 'CastError',
    VALIDATION_ERROR:  'ValidationError',
    JWT_ERROR: 'JsonWebTokenError',
    JWT_EXPIRED_ERROR: 'TokenExpiredError',
    UNCAUGHT_EXCEPTION: 'uncaughtException',
    UNHANDLED_REJECTION: 'unhandledRejection'
});

module.exports = {
    errorType
};

