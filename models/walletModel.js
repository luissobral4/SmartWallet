const mongoose = require('mongoose');
const schemaFactoryWithDetails = require('./modelFactory');

const assetPositionSchema = new schemaFactoryWithDetails({
    total_funds: {
        type: Number,
        required: [true, 'A transaction must have a purchase price.']
    },
    assets: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'AssetPosition'
        }
    ]
});

const AssetPosition = mongoose.model('AssetPosition', assetPositionSchema);

module.exports = AssetPosition;
