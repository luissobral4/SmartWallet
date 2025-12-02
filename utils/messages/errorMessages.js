const askLoginMessage = "Please login again!";

const somethingWentWrongMessage = 'Something went wrong';

const invalidTokenMessage = `Invalid token. ${askLoginMessage}`;

const expiredTokenMessage = `Your token has expired. ${askLoginMessage}`;

const duplicatedFieldMessage = (value) =>
    `Duplicated field value: ${value}. Please use another value!`;

const invalidIbputDataMessage = (errors) =>
    `Invalid input data. ${errors.join(' ')}`;

const documentNotFoundMessage = 'No document found with that ID.';

const tooManyRequestsMessage = 'Too many requests from this IP, please try again later.';

const cantFindUrlMessage = (value) =>
    `Can't find ${value} on this server!`;

const invalidMessage = (path, value) =>
    `Invalid ${path}: ${value}`;

const shuttingDownMessage = `Shutting down...`;

const unhandledRejectionMessage = `UNHANDLED REJECTION! ${shuttingDownMessage}`;

const unhandledExceptionMessage = `UNHANDLED EXCEPTION! ${shuttingDownMessage}`;


module.exports = {
    somethingWentWrongMessage,
    invalidTokenMessage,
    expiredTokenMessage,
    duplicatedFieldMessage,
    invalidIbputDataMessage,
    documentNotFoundMessage,
    tooManyRequestsMessage,
    cantFindUrlMessage,
    invalidMessage,
    unhandledRejectionMessage,
    unhandledExceptionMessage
};