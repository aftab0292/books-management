// Mongoose Model
const Book = require('./model');

// Custom Import 
const AppError = require('../../utils/appError');
const constants = require('../../utils/constants');
const { sendResponse, sendResponseCreated, sendResponseMessage } = require('../../globalResponseHandler');

// Creates a new Book in the DB
exports.addBook = async (req, res) => {
  const book = await Book.create({
    publishDate: new Date(req.body.publishDate),
    ...req.body
  });
  sendResponseCreated(req, res, book, 'Book created successfully!');
};

// Gets a list of Books
exports.getAllBooks = async (req, res) => {
  const books = await Book.find({});
  sendResponse(res, books);
};

// Updates an existing Book in the DB
exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  const existingBook = await Book.findById(bookId).exec();
  if (!existingBook) {
    throw new AppError(
      'Book not found',
      constants.STATUS_CODES.NOT_FOUND,
      constants.ERROR_CODES.NOT_FOUND
    )
  }
  const updated = Object.assign(existingBook, req.body);
  updated.save();
  sendResponseMessage(req, res, { id: updated._id }, 'Book updated successfully!')
};

// Deletes a Book from the DB
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
  const existingBook = await Book.findById(bookId).exec();
  if (!existingBook) {
    throw new AppError(
      'Book not found',
      constants.STATUS_CODES.NOT_FOUND,
      constants.ERROR_CODES.NOT_FOUND
    )
  }
  existingBook.remove();
  sendResponseMessage(req, res, { id: existingBook._id }, 'Book deleted successfully!')
};

exports.getCountByAuthor = async (req, res) => {
  const counts = await Book.aggregate([
    { "$group": { _id: "$author", count: { $sum: 1 } } }
  ]);
  const results = JSON.parse(JSON.stringify(counts))
  sendResponse(res, results.map(({ _id, count }) => ({ author: _id, count })));
}

exports.getCountByPublishedYear = async (req, res) => {
  const counts = await Book.aggregate([
    { "$group": { _id: { year: { $year: "$publishDate" } }, count: { $sum: 1 } } }
  ])
  const results = JSON.parse(JSON.stringify(counts))
  sendResponse(res, results.map(({ _id, count }) => ({ year: _id.year, count })));
}


