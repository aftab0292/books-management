// Custom Imports
const constants = require('../utils/constants');

exports.sendResponse = (res, data, meta = {}) => {
  return res.status(constants.STATUS_CODES.OK).json({
    status: constants.ERROR_TYPES.SUCESS,
    code: constants.ERROR_CODES.OK,
    message: constants.ERROR_CODES.OK,
    meta,
    data,
  });
};

exports.sendResponseMessage = (req, res, data, message = '', meta = {}) => {
  return res.status(constants.STATUS_CODES.OK).json({
    status: constants.ERROR_TYPES.SUCESS,
    code: constants.ERROR_CODES.OK,
    message,
    data,
  });
};

exports.sendResponseCreated = (req, res, data, message = '', meta = {}) => {
  return res.status(constants.STATUS_CODES.CREATED).json({
    status: constants.ERROR_TYPES.SUCESS,
    code: constants.ERROR_CODES.CREATED,
    message,
    data,
  });
};

