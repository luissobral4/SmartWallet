const commonDetailFields = {
    NAME: 'name'
}

const commomProfitFields = {
    PROFIT: 'profit',
    PROFIT_PERCENTAGE: 'profit_percentage'
}

const commonPriceFields = {
    OPEN_PRICE: 'open_price',
    MARKET_PRICE: 'market_price',
}

const commonVolumeFields = {
    VOLUME: 'volume'
}

const commonValueFields = {
    NOMINAL_VALUE: 'nominal_value',
    MARKET_VALUE: 'market_value',
}

const userFields = {
    WALLET: 'wallet',
    EMAIL: 'email',
    AGE: 'age',
    PHOTO: 'photo',
    ROLE: 'role',
    PASSWORD: 'password',
    PASSWORD_CONFIRM: 'password_confirm',
    PASSWORD_CHANGED_AT: 'password_changed_at',
    ...commonDetailFields
}

const assetFields = {
    SYMBOL: 'symbol',
    ISSUER: 'issuer',
    CURRENCY: 'currency',
    GROUP: 'group',
    TYPE: 'type',
    PRICE_HISTORY: 'price_history',
    METADATA: 'metadata',
    ...commonDetailFields
}

const assetPositionFields = {
    ASSET: 'asset',
    TRANSACTIONS: 'transactions',
    ...commonPriceFields,
    ...commomProfitFields,
    ...commonValueFields,
    ...commonVolumeFields
}

const transactionFields = {
    USER: 'user',
    ASSET: 'asset',
    DATE: 'date',
    TYPE: 'type',
    OPEN_PRICE: commonPriceFields.OPEN_PRICE,
    NOMINAL_VALUE: commonValueFields.NOMINAL_VALUE,
    ...commomProfitFields
}

const walletFields = {
    ASSETS: 'assets',
    ...commomProfitFields,
    ...commonValueFields
}

module.exports = {
    userFields,
    assetFields,
    assetPositionFields,
    transactionFields,
    walletFields,
    commonDetailFields,
    commonPriceFields,
    commomProfitFields,
    commonValueFields,
    commonVolumeFields
};