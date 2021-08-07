// Internal Imports
const http = require('http');

//  External Imports
const express = require('express');

// Custom Imports
const globalErrorHandler = require('./globalErrorHandler');

const constants = require('./utils/constants.js');

// Initialize express framework
const app = express();

const server = http.createServer(app);

// Initialize Middlewares
require('./middlewares')(app, express);

// Initialize routes
require('./routes')(app);

// Set base testing routes
app.get('/', (req, res) => {
  res.json({
    name: 'books-management-rest-api',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
  });
});

// Handle route not found
app.all('*', (req, res, next) => {
  console.error(`Requested route is not available on server!`);
  return res.status(constants.STATUS_CODES.NOT_FOUND).json({
    status: constants.ERROR_TYPES.FAIL,
    code: constants.ERROR_CODES.NOT_FOUND,
    message: 'Requested route is not available on server!',
  });
});

// Express global error handler middleware
app.use(globalErrorHandler);

module.exports = server;
