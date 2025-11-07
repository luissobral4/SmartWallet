const mongoose = require('mongoose');
const { nameDefinition, assetDetailsDefinitions, walletDetailsDefinitions } = require('./keysDefinitions');

const schemaFactoryWithName = (object, schemaDefinition, schemaOptions) => {
    return new schemaFactory({
        ...nameDefinition(object),
        ...schemaDefinition
    },schemaOptions);
};

const schemaFactoryWithAssetDetails = (object, schemaDefinition, schemaOptions) => {
    return new schemaFactory({
        ...assetDetailsDefinitions(object),
        ...schemaDefinition
    },schemaOptions);
};

const schemaFactoryWithWalletDetails = (object, schemaDefinition, schemaOptions) => {
    return new schemaFactory({
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
    schemaFactoryWithAssetDetails,
    schemaFactoryWithWalletDetails
};
