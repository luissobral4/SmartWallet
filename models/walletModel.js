const mongoose = require('mongoose');
const schemaFactoryWithWalletDetails = require('./helpers/modelFactory');

const assetPositionSchema = new schemaFactoryWithWalletDetails({
    assets: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'AssetPosition'
        }
    ]
});

const AssetPosition = mongoose.model('AssetPosition', assetPositionSchema);

module.exports = AssetPosition;
