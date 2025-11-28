const errorType = Object.freeze({
  CAST_ERROR: 'CastError',
  VALIDATION_ERROR:  'ValidationError',
  JWT_ERROR: 'JsonWebTokenError',
  JWT_EXPIRED_ERROR: 'jwt TokenExpiredError error'
});

module.exports = {
  errorType
};

