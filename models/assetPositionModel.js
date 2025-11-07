const mongoose = require('mongoose');
const schemaFactoryWithAssetDetails = require('./modelFactory');
const validationMessages = require('../utils/validationMessages');


const object = 'assetPosition';

const assetPositionSchema = new schemaFactoryWithAssetDetails(
    object,
    {
        asset: {
            type: mongoose.Schema.ObjectId,
            ref: 'Asset',
            required: [true, validationMessages.mustBelongMessage(object, 'asset')]
        },
        transactions: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Transaction'
            }
        ]
    }
);

const AssetPosition = mongoose.model('AssetPosition', assetPositionSchema);

module.exports = AssetPosition;
