const mongoose = require('mongoose');
const validate = require('validator');
const { schemaFactoryWithName } = require('./helpers/modelFactory');
const { requiredMessage, provideValidMessage } = require('../utils/validation/validationMessages');
const { ASSET_MODEL } = require('../constants/models');
const { AssetGroup, AssetType } = require('../enums');
const { assetFields } = require('../constants/fields');

const assetSchema = schemaFactoryWithName(
    ASSET_MODEL,
    {
        symbol: {
            type: String,
            required: [true, requiredMessage(ASSET_MODEL, assetFields.SYMBOL)],
            unique: true,
            uppercase: true
        },
        issuer: {
            type: String
        },
        currency: {
            type: String,
            required: [true, requiredMessage(ASSET_MODEL, assetFields.CURRENCY)],
            validate: [validate.isCurrency, provideValidMessage(assetFields.CURRENCY)]
        },
        group: {
            type: String,
            required: [true, requiredMessage(ASSET_MODEL, assetFields.GROUP)],
            enum: AssetGroup,
        },
        type: {
            type: String,
            required: [true, requiredMessage(ASSET_MODEL, assetFields.TYPE)],
            enum: AssetType,
        },
        price_history: {
            type: Map,
            of: Number,
            required: [true, requiredMessage(ASSET_MODEL, assetFields.PRICE_HISTORY)],
            validate: {
                validator: function (val) {
                    for (let [key] of val) {
                        if (!validate.isDate(key, {})) {
                            return false;
                        }
                    }
                },
                message: provideValidMessage('dates in price history')
            }
        },
        metadata: {
            type: Map,
            of: String
        }
    }
);

const Asset = mongoose.model(ASSET_MODEL, assetSchema);

module.exports = Asset;
