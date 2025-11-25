const mongoose = require('mongoose');
const { schemaFactoryWithAssetDetails } = require('./helpers/modelFactory');
const validationMessages = require('../utils/validation/validationMessages');
const { TRANSACTION_MODEL, ASSET_MODEL, USER_MODEL } = require('../constants/models');
const { TRANSACTION_FIELDS } = require('../constants/fields');

const transactionSchema = schemaFactoryWithAssetDetails(
    TRANSACTION_MODEL,
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: USER_MODEL,
            required: [true, validationMessages.mustBelongMessage(TRANSACTION_MODEL, USER_MODEL)]
        },
        asset: {
            type: mongoose.Schema.ObjectId,
            ref: ASSET_MODEL,
            required: [true, validationMessages.mustBelongMessage(TRANSACTION_MODEL, ASSET_MODEL)]
        },
        date: {
            type: Date,
            required: [true, validationMessages.requiredMessage(TRANSACTION_MODEL, TRANSACTION_FIELDS.DATE)]
        }
        // type!! (BUY/SELL)
    }
);

const Transaction = mongoose.model(TRANSACTION_MODEL, transactionSchema);

module.exports = Transaction;
