const mongoose = require('mongoose');
const { schemaFactoryWithWalletDetails } = require('./helpers/modelFactory');
const { WALLET_MODEL, ASSET_POSITION_MODEL} = require('../constants/models');

const WalletSchema = schemaFactoryWithWalletDetails(
    WALLET_MODEL,
    {
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
