const mongoose = require('mongoose');
const schemaFactoryWithAssetDetails = require('./modelFactory');
const validationMessages = require('../utils/validationMessages');

const object = 'transaction';

const transactionSchema = new schemaFactoryWithAssetDetails({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, validationMessages.mustBelongMessage(object, 'user')]
    },
    asset: {
        type: mongoose.Schema.ObjectId,
        ref: 'Asset',
        required: [true, validationMessages.mustBelongMessage(object, 'asset')]
    },
    date: {
        type: Date,
        required: [true, validationMessages.requiredMessage(object, 'date')]
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
