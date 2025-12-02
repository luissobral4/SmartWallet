const mongoose = require('mongoose');
const { nameDefinition, assetDetailsDefinitions, walletDetailsDefinitions, transactionDetailsDefinitions } = require('./keysDefinitions');

const schemaFactoryWithName = (object, schemaDefinition, schemaOptions) => {
    return schemaFactory({
        ...nameDefinition(object),
        ...schemaDefinition
    },schemaOptions);
};

const schemaFactoryWithTransactionDetails = (object, schemaDefinition, schemaOptions) => {
    return schemaFactory({
        ...transactionDetailsDefinitions(object),
        ...schemaDefinition
    },schemaOptions);
};

const schemaFactoryWithAssetDetails = (object, schemaDefinition, schemaOptions) => {
    return schemaFactory({
        ...assetDetailsDefinitions(object),
        ...schemaDefinition
    },schemaOptions);
};

const schemaFactoryWithWalletDetails = (object, schemaDefinition, schemaOptions) => {
    return schemaFactory({
        ...walletDetailsDefinitions(object),
        ...schemaDefinition
    },schemaOptions);
};

const schemaFactory = (schemaDefinition, schemaOptions) => {
    const baseSchema = new mongoose.Schema({
        ...schemaDefinition
    }, {
        timestamps: true,
        ...schemaOptions
    });

    return baseSchema;
};

module.exports = {
    schemaFactory,
    schemaFactoryWithName,
    schemaFactoryWithTransactionDetails,
    schemaFactoryWithAssetDetails,
    schemaFactoryWithWalletDetails
};
