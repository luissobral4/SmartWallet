const dotent = require('dotenv');

const app = require('./app');

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