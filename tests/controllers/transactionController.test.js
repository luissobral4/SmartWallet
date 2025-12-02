const {describe, expect, test} = require('@jest/globals');
const transactionCrontoller = require('../../src/controllers/transactionController');
const User = require("../../src/models/userModel");
const Asset = require("../../src/models/assetModel");
const Transaction = require("../../src/models/transactionModel");

beforeEach(async () => {
    await User.create({ 
        name: "TestUser",
        email: "test@test.com",
        password: "password123",
        password_confirm: "password123",
        age: 25
    });
    await Asset.create({ name: "Keyboard", price: 50 });
    await Transaction.create({ user: null, asset: null, date: new Date() });
});

describe('Transaction Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            headers: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    describe('getAllTransactions', () => {
        test('should be defined', () => {
            const transactions = transactionCrontoller.getAllTransactions(req, res, next);
            expect(transactions).toEqual({});
        });
    });
});