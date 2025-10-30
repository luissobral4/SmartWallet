const mongoose = require('mongoose');
const schemaFactory = require('./modelFactory');

const transactionSchema = new schemaFactory({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A transaction must belong to a user.']
    },
    asset: {
        type: mongoose.Schema.ObjectId,
        ref: 'Asset',
        required: [true, 'A transaction must belong to an asset.']
    },
    purchase_price: {
        type: Number,
        required: [true, 'A transaction must have a purchase price.']
    },
    purchase_date: {
        type: Date,
        required: [true, 'A transaction must have a purchase date.']
    },
    purchase_quantity: {
        type: Number,
        required: [true, 'A transaction must have a purchase quantity.']
    },
    purchase_amount: {
        type: Number,
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
