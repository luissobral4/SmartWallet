const mongoose = require('mongoose');
const { schemaFactoryWithWalletDetails } = require('./helpers/modelFactory');
const { WALLET_MODEL, ASSET_POSITION_MODEL, USER_MODEL} = require('./constants/models');
const { mustBelongMessage } = require('../utils/messages/validationMessages');

const WalletSchema = schemaFactoryWithWalletDetails(
    WALLET_MODEL,
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: USER_MODEL,
            unique: true,
            required: [true, mustBelongMessage(WALLET_MODEL, USER_MODEL)]
        },
        assets: [
            {
                type: mongoose.Schema.ObjectId,
                ref: ASSET_POSITION_MODEL
            }
        ]
    }
);

const Wallet = mongoose.model(WALLET_MODEL, WalletSchema);

module.exports = Wallet;
