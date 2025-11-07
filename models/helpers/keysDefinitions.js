const { COMMON_NAME_FIELD, COMMON_DETAILS_FIELDS } = require('../../constants/fields');
const { COMMON_LIMITS } = require('../../constants/limits');
const validationMessages = require('../../utils/validationMessages');

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
        value: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, COMMON_DETAILS_FIELDS.VALUE)],
            min: [
                COMMON_LIMITS.VALUE.MIN,
                validationMessages.minMessage(model, COMMON_DETAILS_FIELDS.VALUE, COMMON_LIMITS.VALUE.MIN)
            ]
        },
        actual_market_value: {
            type: Number,
            default: COMMON_LIMITS.ACTUAL_MARKET_VALUE.DEFAULT,
            min: [
                COMMON_LIMITS.ACTUAL_MARKET_VALUE.MIN,
                validationMessages.minMessage(model, COMMON_DETAILS_FIELDS.ACTUAL_MARKET_VALUE, COMMON_LIMITS.ACTUAL_MARKET_VALUE.MIN)
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