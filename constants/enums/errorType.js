const errorType = Object.freeze({
  CAST_ERROR: Symbol('CastError'),
  VALIDATION_ERROR:  Symbol('ValidationError'),
  JWT_ERROR: Symbol('JsonWebTokenError'),
  JWT_EXPIRED_ERROR: Symbol('jwt TokenExpiredError error')
});

module.exports = {
  errorType
};

