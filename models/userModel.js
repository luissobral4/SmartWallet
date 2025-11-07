const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const { schemaFactoryWithName } = require('./helpers/modelFactory');
const validationMessages = require('../utils/validationMessages');
const { USER_MODEL, WALLET_MODEL } = require('../constants/models');
const { USER_ROLE } = require('../constants/enums');
const { USER_FIELDS } = require('../constants/fields');
const { USER_LIMITS } = require('../constants/limits');

const userSchema = schemaFactoryWithName(
    USER_MODEL,
    {
        email: {
            type: String,
            required: [true, validationMessages.requiredMessage(USER_MODEL, USER_FIELDS.EMAIL)],
            unique: true,
            lowercase: true,
            validate: [validate.isEmail, validationMessages.provideValidMessage(USER_FIELDS.EMAIL)]
        },
        age: {
            type: Number,
            required: [true, validationMessages.requiredMessage(USER_MODEL, USER_FIELDS.AGE)],
            min: [USER_LIMITS.AGE.MIN, validationMessages.minMessage(USER_MODEL, USER_FIELDS.AGE, USER_LIMITS.AGE.MIN)],
            max: [USER_LIMITS.AGE.MAX, validationMessages.maxMessage(USER_MODEL, USER_FIELDS.AGE, USER_LIMITS.AGE.MAX)]
        },
        photo: {
            type: String,
            default: 'default.jpg'
        },
        role: {
            type: String,
            enum: USER_ROLE,
            default: USER_ROLE.USER
        },
        password: {
            type: String,
            required: [true, validationMessages.requiredMessage(USER_MODEL, USER_FIELDS.PASSWORD)],
            minLength: [
                USER_LIMITS.PASSWORD.MIN_LENGTH,
                validationMessages.minLengthMessage(USER_MODEL, USER_FIELDS.PASSWORD, USER_LIMITS.PASSWORD.MIN_LENGTH)
            ],
            select: false
        },
        password_confirm: {
            type: String,
            required: [true, validationMessages.requiredMessage(USER_MODEL, USER_FIELDS.PASSWORD)],
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
    if (!this.isModified(USER_FIELDS.PASSWORD)) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.password_confirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified(USER_FIELDS.PASSWORD) || this.isNew) return next();

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
