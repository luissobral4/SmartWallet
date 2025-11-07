const complexSubjectBuilder = (object, field) => {
    return `A ${object} ${field} must`;
}

const subjectBuilder = (object) => {
    return `A ${object} must`;
}

const vowels = new Set(['a','e','i','o','u']);

const isVowel = (char) => {
    return vowels.has(char.toLowerCase());
}

const connector = (field) => {
    return isVowel(field.charAt(0)) ? 'an' : 'a';
}

const messageRequiredBuilder = (object, field) => {
    return `${subjectBuilder(object)} have ${connector(field)} ${field}.`;
}

const messageLengthBuilder = (object, field, value, isMin) => {
    const comparator = isMin ? 'more' : 'less';
    return `${complexSubjectBuilder(object,field)} have ${comparator} or equal than ${value} characters.`;
}

const messageMinMaxBuilder = (object, field, value, isMin) => {
    const comparator = isMin ? 'at least' : 'below';
    return `${complexSubjectBuilder(object,field)} be ${comparator} ${value}.`;
}

const messageMustBelongBuilder = (object, field) => {
    return `${subjectBuilder(object)} belong to ${connector(field)} ${field}.`;
}

module.exports = {
    messageLengthBuilder,
    messageMinMaxBuilder,
    messageMustBelongBuilder,
    messageRequiredBuilder
};
