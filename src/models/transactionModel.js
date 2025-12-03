const mongoose = require('mongoose');
const { schemaFactoryWithTransactionDetails } = require('./helpers/modelFactory');
const validationMessages = require('../utils/messages/validationMessages');
const { TRANSACTION_MODEL, ASSET_MODEL, USER_MODEL } = require('./constants/models');
const { transactionFields } = require('./constants/fields');
const { transactionType } = require('../enums/transactionType');

const transactionSchema = schemaFactoryWithTransactionDetails(
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
            required: [true, validationMessages.requiredMessage(TRANSACTION_MODEL, transactionFields.DATE)]
        },
        type: {
            type: String,
            required: [true, validationMessages.requiredMessage(TRANSACTION_MODEL, transactionFields.TYPE)],
            enum: Object.values(transactionType)
        }
    }
);

const Transaction = mongoose.model(TRANSACTION_MODEL, transactionSchema);

module.exports = Transaction;
