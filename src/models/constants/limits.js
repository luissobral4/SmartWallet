const commonDetailLimits = {
  name: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 60,
  }
}

const commonProfitLimits = {
  profit: {
    DEFAULT: 0
  },
  profit_percentage: {
    DEFAULT: 0
  }
};

const commonValueLimits = {
  nominal_value: {
    MIN: 0,
    DEFAULT: 0
  },
  market_value: {
    MIN: 0,
    DEFAULT: 0
  }
};

const commonPriceLimits = {
  open_price: {
    MIN: 0
  },
  market_price: {
    DEFAULT: 0,
    MIN: 0
  },
};

const commonVolumeLimits = {
  volume: {
    MIN: 0
  }
};

const userLimits = {
  name: commonDetailLimits.NAME,
  password: {
    MIN_LENGTH: 8,
  },
  age: {
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