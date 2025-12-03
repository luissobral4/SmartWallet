const { 
    commonDetailFields,
    commonValueFields,
    commonPriceFields,
    commonVolumeFields 
} = require('../constants/fields');
const {
    commonDetailLimits,
    commonProfitLimits,
    commonValueLimits,
    commonPriceLimits,
    commonVolumeLimits
} = require('../constants/limits');
const validationMessages = require('../../utils/messages/validationMessages');

const nameDefinition = (model) => {
    return {
        name: {
            type: String,
            required: [true, validationMessages.requiredMessage(model, commonDetailFields.NAME)],
            minLength: [
                commonDetailLimits.name.MIN_LENGTH,
                validationMessages.minLengthMessage(model, commonDetailFields.NAME, commonDetailLimits.name.MIN_LENGTH)
            ],
            maxLength: [
                commonDetailLimits.name.MAX_LENGTH,
                validationMessages.minLengthMessage(model, commonDetailFields.NAME, commonDetailLimits.name.MAX_LENGTH)
            ]
        }
    };
};

const profitDefinitions = {
    profit: {
        type: Number,
        default: commonProfitLimits.profit.DEFAULT
    },
    profit_percentage: {
        type: Number,
        default: commonProfitLimits.profit_percentage.DEFAULT
    }
};

const valueDefinitions = (model) => {
    return {
        nominal_value: {
            type: Number,
            default: commonValueLimits.nominal_value.DEFAULT,
            min: [
                commonValueLimits.nominal_value.MIN,
                validationMessages.minMessage(model, commonValueFields.NOMINAL_VALUE, commonValueLimits.nominal_value.MIN)
            ]
        },
        market_value: {
            type: Number,
            default: commonValueLimits.market_value.DEFAULT,
            min: [
                commonValueLimits.market_value.MIN,
                validationMessages.minMessage(model, commonValueFields.MARKET_VALUE, commonValueLimits.market_value.MIN)
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
                commonPriceLimits.open_price.MIN,
                validationMessages.minMessage(model, commonPriceFields.OPEN_PRICE, commonPriceLimits.open_price.MIN)
            ]
        },
        market_price: {
            type: Number,
            default: commonPriceLimits.market_price.DEFAULT,
            min: [
                commonPriceLimits.market_price.MIN,
                validationMessages.minMessage(model, commonPriceFields.MARKET_PRICE, commonPriceLimits.market_price.MIN)
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
                commonVolumeLimits.volume.MIN,
                validationMessages.minMessage(model, commonVolumeFields.VOLUME, commonVolumeLimits.volume.MIN)
            ]
        }
    }
};

const transactionDetailsDefinitions = (model) => {
    const valDefs = valueDefinitions(model);
    const prDefs = priceDefinitions(model);

    return {
        nominal_value: valDefs.nominal_value,
        open_price: prDefs.open_price,
        ...volumeDefinition(model),
        ...profitDefinitions
    };
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
        ...valueDefinitions(model),
        ...profitDefinitions
    }
};

module.exports = {
    nameDefinition,
    transactionDetailsDefinitions,
    assetDetailsDefinitions,
    walletDetailsDefinitions
};