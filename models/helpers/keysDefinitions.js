const { commonNameField, commonDetailsFields, priceFields } = require('../../constants/fields');
const { COMMON_LIMITS } = require('../../constants/limits');
const validationMessages = require('../../utils/validation/validationMessages');

const nameDefinition = (model) => {
    return {
        name: {
            type: String,
            required: [true, validationMessages.requiredMessage(model, commonNameField.NAME)],
            minLength: [
                COMMON_LIMITS.NAME.MIN_LENGTH,
                validationMessages.minLengthMessage(model, commonNameField.NAME, COMMON_LIMITS.NAME.MIN_LENGTH)
            ],
            maxLength: [
                COMMON_LIMITS.NAME.MAX_LENGTH,
                validationMessages.minLengthMessage(model, commonNameField.NAME, COMMON_LIMITS.NAME.MAX_LENGTH)
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
            required: [true, validationMessages.requiredMessage(model, commonDetailsFields.NOMINAL_VALUE)],
            min: [
                COMMON_LIMITS.NOMINAL_VALUE.MIN,
                validationMessages.minMessage(model, commonDetailsFields.NOMINAL_VALUE, COMMON_LIMITS.NOMINAL_VALUE.MIN)
            ]
        },
        market_value: {
            type: Number,
            default: COMMON_LIMITS.MARKET_VALUE.DEFAULT,
            min: [
                COMMON_LIMITS.MARKET_VALUE.MIN,
                validationMessages.minMessage(model, commonDetailsFields.MARKET_VALUE, COMMON_LIMITS.MARKET_VALUE.MIN)
            ]
        }
    }
};

const priceDefinitions = (model) => {
    return {
        open_price: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, priceFields.OPEN_PRICE)],
            min: [
                COMMON_LIMITS.OPEN_PRICE.MIN,
                validationMessages.minMessage(model, priceFields.OPEN_PRICE, COMMON_LIMITS.OPEN_PRICE.MIN)
            ]
        },
        market_price: {
            type: Number,
            default: COMMON_LIMITS.ACTUAL_MARKET.DEFAULT,
            min: [
                COMMON_LIMITS.ACTUAL_MARKET.MIN,
                validationMessages.minMessage(model, priceFields.ACTUAL_MARKET, COMMON_LIMITS.ACTUAL_MARKET.MIN)
            ]
        }
    }
};

const volumeDefinition = (model) => {
    return {
        volume: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, commonDetailsFields.VOLUME)],
            min: [
                COMMON_LIMITS.VOLUME.MIN,
                validationMessages.minMessage(model, commonDetailsFields.VOLUME, COMMON_LIMITS.VOLUME.MIN)
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