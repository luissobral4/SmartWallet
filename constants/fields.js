const COMMON_NAME_FIELD = {
    NAME: 'name'
}

const COMMON_DETAILS_FIELDS = {
    VOLUME: 'volume',
    VALUE: 'value',
    ACTUAL_MARKET_VALUE: 'actual_market_value',
    PROFIT: 'profit',
    PROFIT_PERCENTAGE: 'profit_percentage'
}

const USER_FIELDS = {
    EMAIL: 'email',
    AGE: 'age',
    PHOTO: 'photo',
    ROLE: 'role',
    PASSWORD: 'password',
    PASSWORD_CONFIRM: 'password_confirm',
    PASSWORD_CHANGED_AT: 'password_changed_at',
    ...COMMON_NAME_FIELD
}

const ASSET_FIELDS = {
    SYMBOL: 'symbol',
    ISSUER: 'issuer',
    CURRENCY: 'currency',
    GROUP: 'group',
    TYPE: 'type',
    PRICE_HISTORY: 'price_history',
    METADATA: 'metadata',
    ...COMMON_NAME_FIELD
}

const ASSET_POSITION_FIELDS = {
    ASSET: 'asset',
    TRANSACTIONS: 'transactions',
    ...COMMON_DETAILS_FIELDS
}

const TRANSACTION_FIELDS = {
    USER: 'user',
    ASSET: 'asset',
    DATE: 'date',
    //TYPE: 'type',
    ...COMMON_DETAILS_FIELDS
}

const WALLET_FIELDS = {
    ASSETS: 'assets',
    ...COMMON_DETAILS_FIELDS
}

module.exports = {
    USER_FIELDS,
    ASSET_FIELDS,
    ASSET_POSITION_FIELDS,
    TRANSACTION_FIELDS,
    WALLET_FIELDS,
    COMMON_DETAILS_FIELDS,
    COMMON_NAME_FIELD
};