const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const schemaFactoryWithName = require('./helpers/modelFactory');
const validationMessages = require('../utils/validationMessages');

const object = 'user';

const userSchema = new schemaFactoryWithName({
    email: {
        type: String,
        required: [true, validationMessages.requiredMessage(object, 'email')],
        unique: true,
        lowercase: true,
        validate: [validate.isEmail, validationMessages.provideValidEmailMessage]
    },
    age: {
        type: Number,
        required: [true, validationMessages.requiredMessage(object, 'age')],
        min: [18, validationMessages.minMessage(object, 'age', 18)],
        max: [100, validationMessages.maxMessage(object, 'age', 100)]
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, validationMessages.requiredMessage(object, 'password')],
        minLength: [
            8,
            validationMessages.minLengthMessage(object, 'password', 8)
        ],
        select: false
    },
    password_confirm: {
        type: String,
        required: [true, validationMessages.requiredMessage(object, 'password')],
        validate: {
            // This only works on CREATE and SAVE!
            validator: function (val) {
                return val === this.password;
            },
            message: validationMessages.passwordMismatchMessage
        }
    },
    password_changed_at: Date,
    password_reset_token: String,
    password_reset_expires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.password_confirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

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

const User = mongoose.model('User', userSchema);

module.exports = User;
