const USER_ROLE = Object.freeze({
  ADMIN: Symbol('admin'),
  USER:  Symbol('user')
});

const ASSET_GROUP = Object.freeze({
  STOCK: Symbol('stock'),
  ETF:  Symbol('etf'),
  CRYPTO: Symbol('crypto'),
  FUND: Symbol('fund'),
  CASH: Symbol('cash'),
  BOND: Symbol('bond'),
  TREASURY_CERTIFICATE: Symbol('treasury certificate'),
  OTHER: Symbol('other')
});

const ASSET_TYPE = Object.freeze({
  EQUITY: 'equity',
  FIXED_INCOME: 'fixed income',
  CASH: 'cash',
  REAL_ESTATE: 'real estate'
});

module.exports = {
  USER_ROLE,
  ASSET_GROUP,
  ASSET_TYPE
};