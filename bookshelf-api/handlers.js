import { nanoid } from 'nanoid';
import books from './books.js';
import { response } from './utils.js';

function addBook(req, res, body) {
  const {
    name, year, author, summary,
    publisher, pageCount, readPage, reading
  } = body;

  if (!name) {
    return response(res, 400, {
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
  }

  if (readPage > pageCount) {
    return response(res, 400, {
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  const newBook = {
    id, name, year, author, summary,
    publisher, pageCount, readPage, finished,
    reading, insertedAt, updatedAt
  };

  books.push(newBook);

  return response(res, 201, {
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id
    }
  });
}

function getAllBooks(_, res) {
  const simplified = books.map(({ id, name, publisher }) => ({
    id, name, publisher
  }));

  return response(res, 200, {
    status: 'success',
    data: { books: simplified }
  });
}

function getBookById(req, res, id) {
  const book = books.find((b) => b.id === id);

  if (!book) {
    return response(res, 404, {
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
  }

  return response(res, 200, {
    status: 'success',
    data: { book }
  });
}

function updateBookById(req, res, id, body) {
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return response(res, 404, {
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
  }

  const {
    name, year, author, summary,
    publisher, pageCount, readPage, reading
  } = body;

  if (!name) {
    return response(res, 400, {
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
  }

  if (readPage > pageCount) {
    return response(res, 400, {
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
  }

  const updatedAt = new Date().toISOString();
  const finished = readPage === pageCount;

  books[index] = {
    ...books[index],
    name, year, author, summary, publisher,
    pageCount, readPage, reading,
    finished, updatedAt
  };

  return response(res, 200, {
    status: 'success',
    message: 'Buku berhasil diperbarui'
  });
}

function deleteBookById(_, res, id) {
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return response(res, 404, {
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
  }

  books.splice(index, 1);
  return response(res, 200, {
    status: 'success',
    message: 'Buku berhasil dihapus'
  });
}

export {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById
};
