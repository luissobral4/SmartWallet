const { COMMON_NAME_FIELD, COMMON_DETAILS_FIELDS, PRICE_FIELDS } = require('../../constants/fields');
const { COMMON_LIMITS } = require('../../constants/limits');
const validationMessages = require('../../utils/validation/validationMessages');

const nameDefinition = (model) => {
    return {
        name: {
            type: String,
            required: [true, validationMessages.requiredMessage(model, COMMON_NAME_FIELD.NAME)],
            minLength: [
                COMMON_LIMITS.NAME.MIN_LENGTH,
                validationMessages.minLengthMessage(model, COMMON_NAME_FIELD.NAME, COMMON_LIMITS.NAME.MIN_LENGTH)
            ],
            maxLength: [
                COMMON_LIMITS.NAME.MAX_LENGTH,
                validationMessages.minLengthMessage(model, COMMON_NAME_FIELD.NAME, COMMON_LIMITS.NAME.MAX_LENGTH)
            ]
        }
    };
};

const profitDefinitions = {
    profit: {
        type: Number,
        default: COMMON_LIMITS.PROFIT.DEFAULT
    },
    profit_percentage: {
        type: Number,
        default: COMMON_LIMITS.PROFIT_PERCENTAGE.DEFAULT
    }
};

const valueDefinitions = (model) => {
    return {
        nominal_value: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, COMMON_DETAILS_FIELDS.NOMINAL_VALUE)],
            min: [
                COMMON_LIMITS.NOMINAL_VALUE.MIN,
                validationMessages.minMessage(model, COMMON_DETAILS_FIELDS.NOMINAL_VALUE, COMMON_LIMITS.NOMINAL_VALUE.MIN)
            ]
        },
        market_value: {
            type: Number,
            default: COMMON_LIMITS.MARKET_VALUE.DEFAULT,
            min: [
                COMMON_LIMITS.MARKET_VALUE.MIN,
                validationMessages.minMessage(model, COMMON_DETAILS_FIELDS.MARKET_VALUE, COMMON_LIMITS.MARKET_VALUE.MIN)
            ]
        }
    }
};

const priceDefinitions = (model) => {
    return {
        open_price: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, PRICE_FIELDS.OPEN_PRICE)],
            min: [
                COMMON_LIMITS.OPEN_PRICE.MIN,
                validationMessages.minMessage(model, PRICE_FIELDS.OPEN_PRICE, COMMON_LIMITS.OPEN_PRICE.MIN)
            ]
        },
        market_price: {
            type: Number,
            default: COMMON_LIMITS.ACTUAL_MARKET.DEFAULT,
            min: [
                COMMON_LIMITS.ACTUAL_MARKET.MIN,
                validationMessages.minMessage(model, PRICE_FIELDS.ACTUAL_MARKET, COMMON_LIMITS.ACTUAL_MARKET.MIN)
            ]
        }
    }
};

const volumeDefinition = (model) => {
    return {
        volume: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, COMMON_DETAILS_FIELDS.VOLUME)],
            min: [
                COMMON_LIMITS.VOLUME.MIN,
                validationMessages.minMessage(model, COMMON_DETAILS_FIELDS.VOLUME, COMMON_LIMITS.VOLUME.MIN)
            ]
        }
    }
};

const assetDetailsDefinitions = (model) => {
    return {
        ...volumeDefinition(model),
        ...valueDefinitions(model),
        ...priceDefinitions(model),
        ...profitDefinitions
    }
};

const walletDetailsDefinitions = (model) => {
    return {
        ...volumeDefinition(model),
        ...valueDefinitions(model),
        ...profitDefinitions
    }
};

module.exports = {
    nameDefinition,
    assetDetailsDefinitions,
    walletDetailsDefinitions
};