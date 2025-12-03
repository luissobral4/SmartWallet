const {describe, expect, test, beforeEach } = require('@jest/globals');
const transactionController = require('../../src/controllers/transactionController');
const User = require("../../src/models/userModel");
const Asset = require("../../src/models/assetModel");
const Transaction = require("../../src/models/transactionModel");
const { assetGroup } = require('../../src/enums/assetGroup');
const { assetType } = require('../../src/enums/assetType');
const { currency } = require('../../src/enums/currency');
const { transactionType } = require('../../src/enums/transactionType');

let user, asset;
beforeEach(async () => {
    user = await User.create({ 
        name: "TestUser",
        email: "test@test.com",
        password: "password123",
        password_confirm: "password123",
        age: 25
    });

    asset = await Asset.create({
        name: "Amundi Core Stoxx Europe 600 UCITS ETF Acc",
        symbol: "LYP6",
        currency: currency.EUR,
        group: assetGroup.ETF,
        type: assetType.EQUITY,
        price_history: {
            "2025-12-03": 278.1
        },
        price: 50
    });
});

describe('Transaction Controller', () => {
    let req, transaction;

    beforeEach(async () => {
        transaction = await Transaction.create({
            user: user._id,
            asset: asset._id,
            date: new Date("2025-12-03"),
            type: transactionType.BUY,
            open_price: 278.1,
            volume: 10,
            nominal_value: 2781
        });

        req = {
            query: {},
            requestTime: new Date().toISOString()
        };
    });

    describe('getAllTransactions', () => {
        test('should be defined', async () => {
            const docs = await transactionController.getAllAsync(req);

            expect(docs[0]._id.toString()).toBe(transaction._id.toString());
            expect(docs[0].type).toBe(transactionType.BUY);
        });
    });
});