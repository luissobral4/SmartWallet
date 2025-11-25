const assetGroup = Object.freeze({
  STOCK: Symbol('stock'),
  ETF: Symbol('etf'),
  CRYPTO: Symbol('crypto'),
  FUND: Symbol('fund'),
  CASH: Symbol('cash'),
  BOND: Symbol('bond'),
  TREASURY_CERTIFICATE: Symbol('treasury certificate'),
  OTHER: Symbol('other')
});

module.exports = {
  assetGroup
};
