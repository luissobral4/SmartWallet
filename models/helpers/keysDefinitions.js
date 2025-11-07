const validationMessages = require('../../utils/validationMessages');

const nameDefinition = (object) => {
    return {
        name: {
            type: String,
            required: [true, validationMessages.requiredMessage(object, 'name')]
        }
    }
};

const profitDefinitions = {
    profit: {
        type: Number,
        default: 0
    },
    profit_percentage: {
        type: Number,
        default: 0
    }
};

const valueDefinitions = (object) => {
    return {
        value: {
            type: Number,
            required: [true, validationMessages.requiredMessage(object, 'value')],
            min: [0, validationMessages.minMessage(object, 'value', 0)]
        },
        actual_market_value: {
            type: Number,
            default: 0,
            min: [0, validationMessages.minMessage(object, 'actual market value', 0)]
        }
    }
};

const volumeDefinition = (object) => {
    return {
        volume: {
            type: Number,
            required: [true, validationMessages.requiredMessage(object, 'volume')],
            min: [0, validationMessages.minMessage(object, 'volume', 0)]
        }
    }
};

const assetDetailsDefinitions = (object) => {
    return {
        ...volumeDefinition(object),
        ...valueDefinitions(object),
        ...profitDefinitions
    }
};

const walletDetailsDefinitions = (object) => {
    return {
        ...volumeDefinition(object),
        ...valueDefinitions(object),
        ...profitDefinitions
    }
};

module.exports = {
    nameDefinition,
    assetDetailsDefinitions,
    walletDetailsDefinitions
};