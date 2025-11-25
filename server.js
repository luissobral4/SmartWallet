const dotent = require('dotenv');
const app = require('./app');

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message, err.stack);
    console.log(`UNCAUGHT EXCEPTION! Shutting down...`);
    process.exit(1);
});

dotent.config({ path: './.env' });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message, err.stack);
    console.log(`UNHANDLED REJECTION! Shutting down...`);
    server.close(() => {
        process.exit(1);
    });
});