const messageHelpers = require("./messageHelpers");

const requiredMessage = (object, field) => {
    return messageHelpers.messageMustBelongBuilder(object, field);
}

const minMessage = (object, field, value) => {
    return messageHelpers.messageLengthBuilder(object, field, value, true);
}

const maxMessage = (object, field, value) => {
    return messageHelpers.messageLengthBuilder(object, field, value, false);
}

const minLengthMessage = (object, field, value) => {
    return messageHelpers.messageLengthBuilder(object, field, value, true);
}

const maxLengthMessage = (object, field, value) => {
    return messageHelpers.messageLengthBuilder(object, field, value, false);
}

const mustBelongMessage = (object, field) => {
    return messageHelpers.messageMustBelongBuilder(object, field);
}

const passwordMismatchMessage = 'Passwords are not the same.';

const provideValidEmailMessage = 'Please provide a valid email.';

module.exports = {
    mustBelongMessage,
    requiredMessage,
    minMessage,
    maxMessage,
    minLengthMessage,
    maxLengthMessage,
    passwordMismatchMessage,
    provideValidEmailMessage
};