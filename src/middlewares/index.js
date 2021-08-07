// External Imports
const cors = require('cors');
const compression = require('compression');

module.exports = (app, express) => {
  // Enable compression
  app.use(compression());

  // Enable CORS
  app.use(cors());

  // Enable request body parsing in JSON format
  app.use(express.json());
};
