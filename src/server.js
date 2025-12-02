const dotent = require('dotenv');
const errorMessages = require('./utils/messages/errorMessages');
const errorType = require('./utils/error/errorType');
const mongoose = require('mongoose');

process.on(errorType.UNCAUGHT_EXCEPTION, (err) => {
    console.log(err.name, err.message, err.stack);
    console.log(errorMessages.unhandledExceptionMessage);
    process.exit(1);
});

dotent.config({ path: '../.env' });

const app = require('./app');

let dbConnectionString = process.env.DB_CONNECTION_STRING
    .replace('<db_password>', process.env.DB_PASSWORD)
    .replace('<db_name>', process.env.DB_NAME);

mongoose
    .connect(dbConnectionString)
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on(errorType.UNHANDLED_REJECTION, (err) => {
    console.log(err.name, err.message, err.stack);
    console.log(errorMessages.unhandledRejectionMessage);
    server.close(() => {
        process.exit(1);
    });
});