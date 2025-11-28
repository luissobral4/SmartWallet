const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/error/appError');
const globalErrorHandler = require('./controllers/errorController');
const { environmentType } = require('./enums/environmentType');

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === environmentType.DEVELOPMENT) {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.'
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.all('/{*splat}', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;