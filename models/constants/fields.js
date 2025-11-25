const commonNameField = {
    NAME: 'name'
}

const commonDetailsFields = {
    VOLUME: 'volume',
    NOMINAL_VALUE: 'nominal_value',
    MARKET_VALUE: 'market_value',
    PROFIT: 'profit',
    PROFIT_PERCENTAGE: 'profit_percentage'
}

const priceFields = {
    OPEN_PRICE: 'open_price',
    MARKET_PRICE: 'market_price',
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
    ...commonNameField
}

const assetFields = {
    SYMBOL: 'symbol',
    ISSUER: 'issuer',
    CURRENCY: 'currency',
    GROUP: 'group',
    TYPE: 'type',
    PRICE_HISTORY: 'price_history',
    METADATA: 'metadata',
    ...commonNameField
}

const assetPositionFields = {
    ASSET: 'asset',
    TRANSACTIONS: 'transactions',
    ...priceFields,
    ...commonDetailsFields
}

const transactionFields = {
    USER: 'user',
    ASSET: 'asset',
    DATE: 'date',
    //TYPE: 'type',
    ...priceFields,
    ...commonDetailsFields
}

const walletFields = {
    ASSETS: 'assets',
    ...commonDetailsFields
}

module.exports = {
    userFields,
    assetFields,
    assetPositionFields,
    transactionFields,
    walletFields,
    commonDetailsFields,
    commonNameField,
    priceFields
};