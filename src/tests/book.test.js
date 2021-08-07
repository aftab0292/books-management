const request = require('supertest');
const Book = require('../api/book/model');
const mongoose = require('mongoose');

let server;

describe('/api/book', () => {
  jest.setTimeout(60000);
  beforeEach(() => {
    server = require('../../server')
  });

  afterEach(async () => {
    // await server.close();
    await Book.deleteMany({});
  })

  describe('GET /', () => {
    it('should return all books', async () => {
      const books = [
        {
          "name": "Book12",
          "author": "Author1",
          "publishDate": "11-24-2020"
        },
        {
          "name": "Book22",
          "author": "Author2",
          "publishDate": "11-22-2019"
        }
      ];

      await Book.collection.insertMany(books);

      const res = await request(server).get('/api/book');
      expect(res.status).toBe(200);
      expect(res.body.data.some(b => b.name === 'Book12')).toBeTruthy();
      expect(res.body.data.some(b => b.name === 'Book22')).toBeTruthy();
    });
  });

  describe('POST /', () => {
    it('should save the book if it is valid', async () => {
      const res = await request(server)
        .post('/api/book')
        .send({
          "name": "Javascript for beginners",
          "author": "John Doe",
          "publishDate": "11-24-2020"
        });
      expect(res.status).toBe(201);
    });
  })

  describe('PUT /:id', () => {
    let id;
    let book;
    let newName;

    beforeEach(async () => {
      book = new Book({
        "name": "Book1",
        "author": "Author1",
        "publishDate": "11-24-2020"
      });
      await book.save();
      id = book._id;
      newName = 'updatedBook';
    })

    it('should return the updated book id if it is valid', async () => {
      const res = await request(server)
        .put('/api/book/' + id)
        .send({
          "name": newName,
          "author": "Author1",
          "publishDate": "11-24-2020"
        });

      expect(res.body.data).toHaveProperty('id');
    });
  })

  describe('DELETE /:id', () => {
    let id;
    let book;

    beforeEach(async () => {
      book = new Book({
        "name": "Book1",
        "author": "Author1",
        "publishDate": "11-24-2020"
      });
      await book.save();
      id = book._id;
    })

    it('should delete the book if input is valid', async () => {
      await request(server).delete(`/api/book/${id}`).send();
      const genreInDb = await Book.findById(id);
      expect(genreInDb).toBeNull();
    });
  })

  // describe('count by published year', () => {
  //   it('should return books count by published year', async () => {
  //     const books = [
  //       {
  //         "name": "Book12",
  //         "author": "Author1",
  //         "publishDate": "11-24-2020"
  //       },
  //       {
  //         "name": "Book22",
  //         "author": "Author2",
  //         "publishDate": "11-22-2019"
  //       }
  //     ];

  //     await Book.collection.insertMany(books);

  //     const res = await request(server).get('/api/book/count_by_published_year');
  //     expect(res.status).toBe(200);
  //     expect(res.body.data.some(b => b.year === '2020')).toBeTruthy();
  //     expect(res.body.data.some(b => b.year === '2019')).toBeTruthy();
  //   });
  // });

  // describe('count by author', () => {
  //   it('should return books count by author', async () => {
  //     const books = [
  //       {
  //         "name": "Book12",
  //         "author": "Author1",
  //         "publishDate": "11-24-2020"
  //       },
  //       {
  //         "name": "Book22",
  //         "author": "Author2",
  //         "publishDate": "11-22-2019"
  //       }
  //     ];

  //     await Book.collection.insertMany(books);

  //     const res = await request(server).get('/api/book/count_by_author');
  //     expect(res.status).toBe(200);
  //     expect(res.body.data.some(b => b.author === 'Author1')).toBeTruthy();
  //     expect(res.body.data.some(b => b.author === 'Author2')).toBeTruthy();
  //   });
  // });
})