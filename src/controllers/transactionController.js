const Transaction = require('../models/transactionModel');
const queryFactory = require('./queryFactory');
const responseFactory = require('./responseFactory');
const { transactionFields } = require('../models/constants/fields');
const AppError = require('../utils/error/appError');
const responseStatusCode = require('../utils/responseStatusCode');
const errorMessages = require('../utils/messages/errorMessages');
const catchAsync = require('../utils/error/catchAsync');

const buildDocumentNotFoundError = () =>
    new AppError(errorMessages.documentNotFoundMessage, responseStatusCode.NOT_FOUND);

const getAllAsync = queryFactory.getAllAsync(Transaction);

const getAsync = queryFactory.getOneAsync(Transaction, transactionFields.USER, transactionFields.ASSET);

const createAsync = queryFactory.createOneAsync(Transaction);

const deleteAsync = queryFactory.deleteOneAsync(Transaction);

const updateAsync = queryFactory.updateOneAsync(Transaction);

const getAllTransactions = catchAsync(async (req, res, next) => {
    const transactions = await getAllAsync(req);

    return responseFactory.getAllResponse(transactions) (req, res, next);
});

const getTransaction = catchAsync(async (req, res, next) => {
    const transaction = getAsync(req);

    if (!transaction) {
        return next(buildDocumentNotFoundError());
    }

    return responseFactory.getOneResponse(res, transaction);
});

const createTransaction = catchAsync(async (req, res, next) => {
    const newTransaction = createAsync(req);

    return responseFactory.createOneResponse(res, newTransaction);
});

const updateTransaction = catchAsync(async (req, res, next) => {
    const updatedTransaction = updateAsync(req);

    if (!updatedTransaction) {
        return next(buildDocumentNotFoundError());
    }

    return responseFactory.updateOneResponse(res, updatedTransaction);
});

const deleteTransaction = catchAsync(async (req, res, next) => {
    const deletedTransaction = deleteAsync(req);

    if (!deletedTransaction) {
        return next(buildDocumentNotFoundError());
    }

    return responseFactory.deleteOneResponse(res);
});



module.exports = {
    getAllTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction,
    getAllAsync
};
