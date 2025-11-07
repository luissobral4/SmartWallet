const COMMON_LIMITS = {
  NAME: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 20,
  },
  PROFIT: {
    DEFAULT: 0
  },
  PROFIT_PERCENTAGE: {
    DEFAULT: 0
  },
  VALUE: {
    MIN: 0
  },
  ACTUAL_MARKET_VALUE: {
    MIN: 0,
    DEFAULT: 0
  },
  VOLUME: {
    MIN: 0
  }
};

const USER_LIMITS = {
  PASSWORD: {
    MIN_LENGTH: 8,
  },
  AGE: {
    MIN: 12,
    MAX: 120,
  },
};

module.exports = {
  USER_LIMITS,
  COMMON_LIMITS
};