const mongoose = require('mongoose');

const schemaFactoryWithName = (schemaDefinition, schemaOptions) => {
    return new schemaFactory({
        name: {
        type: String,
        required: [true, 'A user must have a name.']
        },
        ...schemaDefinition
    },schemaOptions);
};

const schemaFactoryWithDetails = (schemaDefinition, schemaOptions) => {
    return new schemaFactory({
        profit: {
            type: Number,
            default: 0
        },
        profitPercentage: {
            type: Number,
            default: 0
        },
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
    schemaFactoryWithDetails
};
