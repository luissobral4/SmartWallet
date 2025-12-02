const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const { schemaFactoryWithName } = require('./helpers/modelFactory');
const validationMessages = require('../utils/messages/validationMessages');
const { USER_MODEL, WALLET_MODEL } = require('../constants/models');
const { userRole } = require('../enums');
const { userFields } = require('../constants/fields');
const { userLimits } = require('../constants/limits');

const userSchema = schemaFactoryWithName(
    USER_MODEL,
    {
        email: {
            type: String,
            required: [true, validationMessages.requiredMessage(USER_MODEL, userFields.EMAIL)],
            unique: true,
            lowercase: true,
            validate: [validate.isEmail, validationMessages.provideValidMessage(userFields.EMAIL)]
        },
        age: {
            type: Number,
            required: [true, validationMessages.requiredMessage(USER_MODEL, userFields.AGE)],
            min: [userLimits.AGE.MIN, validationMessages.minMessage(USER_MODEL, userFields.AGE, userLimits.AGE.MIN)],
            max: [userLimits.AGE.MAX, validationMessages.maxMessage(USER_MODEL, userFields.AGE, userLimits.AGE.MAX)]
        },
        photo: {
            type: String,
            default: 'default.jpg'
        },
        role: {
            type: String,
            enum: userRole,
            default: userRole.USER
        },
        password: {
            type: String,
            required: [true, validationMessages.requiredMessage(USER_MODEL, userFields.PASSWORD)],
            minLength: [
                userLimits.PASSWORD.MIN_LENGTH,
                validationMessages.minLengthMessage(USER_MODEL, userFields.PASSWORD, userLimits.PASSWORD.MIN_LENGTH)
            ],
            select: false
        },
        password_confirm: {
            type: String,
            required: [true, validationMessages.requiredMessage(USER_MODEL, userFields.PASSWORD)],
            validate: {
                // This only works on CREATE and SAVE!
                validator: function (val) {
                    return val === this.password;
                },
                message: validationMessages.passwordMismatchMessage
            }
        },
        wallet: {
            type: mongoose.Schema.ObjectId,
            ref: WALLET_MODEL,
            required: [true, validationMessages.mustBelongMessage(USER_MODEL, WALLET_MODEL)]
        },
        password_changed_at: Date,
        password_reset_token: String,
        password_reset_expires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false
        }
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified(userFields.PASSWORD)) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.password_confirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified(userFields.PASSWORD) || this.isNew) return next();

    this.password_changed_at = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.passwordCheck = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (jwtTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = Number.parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return jwtTimestamp < changedTimestamp;
    }

    return false;
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model(USER_MODEL, userSchema);

module.exports = User;
