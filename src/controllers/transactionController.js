const Transaction = require('../models/transactionModel');
const factory = require('./handlerFactory');
const { transactionFields } = require('../models/constants/fields');

const getAllTransactions = factory.getAll(Transaction);

const getTransaction = factory.getOne(Transaction, transactionFields.USER, transactionFields.ASSET);

const createTransaction = factory.createOne(Transaction);

const deleteTransaction = factory.deleteOne(Transaction);

const updateTransaction = factory.updateOne(Transaction);

module.exports = {
    getAllTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction
};
