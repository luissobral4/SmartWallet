const mongoose = require('mongoose');
const { schemaFactoryWithAssetDetails } = require('./helpers/modelFactory');
const validationMessages = require('../utils/validationMessages');
const { ASSET_POSITION_MODEL, ASSET_MODEL, TRANSACTION_MODEL } = require('../constants/models');

const assetPositionSchema = schemaFactoryWithAssetDetails(
    ASSET_POSITION_MODEL,
    {
        asset: {
            type: mongoose.Schema.ObjectId,
            ref: ASSET_MODEL,
            required: [true, validationMessages.mustBelongMessage(ASSET_POSITION_MODEL, ASSET_MODEL)]
        },
        transactions: [
            {
                type: mongoose.Schema.ObjectId,
                ref: TRANSACTION_MODEL
            }
        ]
    }
);

const AssetPosition = mongoose.model(ASSET_POSITION_MODEL, assetPositionSchema);

module.exports = AssetPosition;
