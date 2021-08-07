/**
 * Main application routes
 */
module.exports = (app) => {
  // Initialize base route
  const baseRoute = '/api';

  // initialize routes for book module
  app.use(`${baseRoute}/book`, require('../api/book'));
};
