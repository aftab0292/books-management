const { ERROR_TYPES: { FAIL, ERROR } } = require('./constants.js');

class AppError extends Error {
  constructor(message, statusCode, errorCode, meta) {
    super(message);
    this.statusCode = statusCode;
    this.code = errorCode;
    this.status = `${statusCode}`.startsWith('4') ? FAIL : ERROR;
    this.meta = meta || {};
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
