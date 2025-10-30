const mongoose = require('mongoose');
const schemaFactoryWithDetails = require('./modelFactory');

const assetPositionSchema = new schemaFactoryWithDetails({
    asset: {
        type: mongoose.Schema.ObjectId,
        ref: 'Asset',
        required: [true, 'An asset position must belong to an asset.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A asset position must belong to a user.']
    },
    quantity: {
        type: Number,
        required: [true, 'An asset position must have an quantity.']
    },
    initial_amount: {
        type: Number,
        required: [true, 'An asset position must have an initial amount.']
    },
    actual_amount: {
        type: Number,
        required: [true, 'An asset position must have an actual amount.']
    },
    transactions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Transaction'
        }
    ]
});

const AssetPosition = mongoose.model('AssetPosition', assetPositionSchema);

module.exports = AssetPosition;
