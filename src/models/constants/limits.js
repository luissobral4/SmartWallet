const commonDetailLimits = {
  NAME: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 20,
  }
}

const commonProfitLimits = {
  PROFIT: {
    DEFAULT: 0
  },
  PROFIT_PERCENTAGE: {
    DEFAULT: 0
  }
};

const commonValueLimits = {
  NOMINAL_VALUE: {
    MIN: 0
  },
  MARKET_VALUE: {
    MIN: 0,
    DEFAULT: 0
  }
};

const commonPriceLimits = {
  OPEN_PRICE: {
    MIN: 0
  },
  MARKET_PRICE: {
    DEFAULT: 0,
    MIN: 0
  },
};

const commonVolumeLimits = {
  VOLUME: {
    MIN: 0
  }
};

const userLimits = {
  NAME: commonDetailLimits.NAME,
  PASSWORD: {
    MIN_LENGTH: 8,
  },
  AGE: {
    MIN: 12,
    MAX: 120,
  },
};

module.exports = {
  userLimits,
  commonDetailLimits,
  commonProfitLimits,
  commonValueLimits,
  commonPriceLimits,
  commonVolumeLimits
};