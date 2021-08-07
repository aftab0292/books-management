// External Import
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Book Name is required'],
      maxlength: [100, 'Book Name can not be more than 100 characters']
    },
    publishDate: {
      type: Date,
      required: [true, 'Book Published Date is required'],
    },
    author: {
      type: String,
      required: [true, 'Author Name is Required'],
      maxlength: [100, 'Author Name can not be more than 100 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('Book', BookSchema);
