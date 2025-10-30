const mongoose = require('mongoose');
const validate = require('validator');
const schemaFactoryWithName = require('./modelFactory');

const assetSchema = new schemaFactoryWithName({
    symbol: {
        type: String,
        required: [true, 'An asset must have a symbol.'],
        unique: true,
        uppercase: true
    },
    ussuer: {
        type: String
    },
    currency: {
        type: String,
        required: [true, 'An asset must have a currency.'],
        validate: [validate.isCurrency, 'Please provide a valid currency.']
    },
    group: {
        type: String,
        required: [true, 'An asset must have a group.'],
        enum: ['stock', 'etf', 'crypto', 'fund', 'cash', 'bond', 'treasury certificate','other'],
    },
    type: {
        type: String,
        required: [true, 'An asset must have a type.'],
        enum: ['equity', 'fixed income', 'cash', 'real estate'],
    },
    prices: {
        type: Map,
        of: Number,
        required: [true, 'An asset must have prices.'],
        validate: {
            validator: function (val) {
                for (let [key, value] of val) {
                    if (!validate.isDate(key, {})) {
                        return false;
                    }
                }
            },
            message: 'Please provide valid dates as keys for prices.'
        }
    },
    metadata: {
        type: Map,
        of: String
    }
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
