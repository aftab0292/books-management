// Internal Imports
const util = require('util');

// Set Environment variable
require('dotenv').config({ path: './src/configuration/config.env' });

// Uncaught exception listener
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION!, Shutting down...');
  console.error(util.format(`UNCAUGHT EXCEPTION: %O`, err));
  process.exit(1);
});

// Bootstrap express application
const app = require('./src/app');

// Initialize mongoDb
require('./src/mongodb');

// Set port
const PORT = process.env.PORT || 3000;

// Set Environment
const environment = process.env.NODE_ENV || 'development';

// Start server
const server = app.listen(PORT, () => {
  console.info(`Express server listening on PORT: ${PORT} with PROCESSID: ${process.pid}`);
  console.info(`Environment: ${environment}`);
});

// unhandle rejection listener
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION!, Shutting down...');
  console.error(util.format(`UNHANDLED REJECTION: %O`, err));
  server.close(() => {
    process.exit(1);
  });
});

/**
 * Catch kill signals and stop gracefully
 */
const shutdown = async () => {
  console.debug('Shutting down gracefully');
  server.close(() => {
    console.debug('Process terminated!');
  });
};

process.on('SIGTERM', shutdown).on('SIGINT', shutdown).on('SIGUP', shutdown);

module.exports = server;