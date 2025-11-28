const { commonDetailFields, commonValueFields, commonPriceFields, commonVolumeFields } = require('../../constants/fields');
const { commonDetailLimits, commonProfitLimits, commonValueLimits, commonPriceLimits, commonVolumeLimits } = require('../../constants/limits');
const validationMessages = require('../../utils/validation/validationMessages');

const nameDefinition = (model) => {
    return {
        name: {
            type: String,
            required: [true, validationMessages.requiredMessage(model, commonDetailFields.NAME)],
            minLength: [
                commonDetailLimits.NAME.MIN_LENGTH,
                validationMessages.minLengthMessage(model, commonDetailFields.NAME, commonDetailLimits.NAME.MIN_LENGTH)
            ],
            maxLength: [
                commonDetailLimits.NAME.MAX_LENGTH,
                validationMessages.minLengthMessage(model, commonDetailFields.NAME, commonDetailLimits.NAME.MAX_LENGTH)
            ]
        }
    };
};

const profitDefinitions = {
    profit: {
        type: Number,
        default: commonProfitLimits.PROFIT.DEFAULT
    },
    profit_percentage: {
        type: Number,
        default: commonProfitLimits.PROFIT_PERCENTAGE.DEFAULT
    }
};

const valueDefinitions = (model) => {
    return {
        nominal_value: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, commonValueFields.NOMINAL_VALUE)],
            min: [
                commonDetailLimits.NOMINAL_VALUE.MIN,
                validationMessages.minMessage(model, commonValueFields.NOMINAL_VALUE, commonValueLimits.NOMINAL_VALUE.MIN)
            ]
        },
        market_value: {
            type: Number,
            default: commonValueLimits.MARKET_VALUE.DEFAULT,
            min: [
                commonValueLimits.MARKET_VALUE.MIN,
                validationMessages.minMessage(model, commonValueFields.MARKET_VALUE, commonValueLimits.MARKET_VALUE.MIN)
            ]
        }
    }
};

const priceDefinitions = (model) => {
    return {
        open_price: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, commonPriceFields.OPEN_PRICE)],
            min: [
                commonPriceLimits.OPEN_PRICE.MIN,
                validationMessages.minMessage(model, commonPriceFields.OPEN_PRICE, commonPriceLimits.OPEN_PRICE.MIN)
            ]
        },
        market_price: {
            type: Number,
            default: commonPriceLimits.MARKET_PRICE.DEFAULT,
            min: [
                commonPriceLimits.ACTUAL_MARKET.MIN,
                validationMessages.minMessage(model, commonPriceFields.M, commonPriceLimits.ACTUAL_MARKET.MIN)
            ]
        }
    }
};

const volumeDefinition = (model) => {
    return {
        volume: {
            type: Number,
            required: [true, validationMessages.requiredMessage(model, commonVolumeFields.VOLUME)],
            min: [
                commonVolumeLimits.VOLUME.MIN,
                validationMessages.minMessage(model, commonVolumeFields.VOLUME, commonVolumeLimits.VOLUME.MIN)
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