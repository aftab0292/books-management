const express = require('express');
const controller = require('./controller');
const asyncMiddleware = require('../../middlewares/asyncMiddleware');

const router = express.Router();

router
  .route('/')
  .post(asyncMiddleware(controller.addBook))
  .get(asyncMiddleware(controller.getAllBooks));

router
  .route('/count_by_author')
  .get(asyncMiddleware(controller.getCountByAuthor));

router
  .route('/count_by_published_year')
  .get(asyncMiddleware(controller.getCountByPublishedYear));

router
  .route('/:id')
  .put(asyncMiddleware(controller.updateBook))
  .delete(asyncMiddleware(controller.deleteBook));

module.exports = router;
