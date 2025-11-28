const askLoginMessage = "Please login again!";

const somethingWentWrongMessage = 'Something went wrong';

const invalidTokenMessage = `Invalid token. ${askLoginMessage}`;

const expiredTokenMessage = `Your token has expired. ${askLoginMessage}`;

const duplicatedFieldMessage = (value) =>
    `Duplicated field value: ${value}. Please use another value!`;

const invalidIbputDataMessage = (errors) =>
    `Invalid input data. ${errors.join(' ')}`;

module.exports = {
    somethingWentWrongMessage,
    invalidTokenMessage,
    expiredTokenMessage,
    duplicatedFieldMessage,
    invalidIbputDataMessage
};