import { addBook, getAllBooks, getBookById, updateBookById, deleteBookById } from './handlers.js';

function route(req, res) {
  const { method, url } = req;
  const parts = url.split('/').filter(Boolean);

  // POST /books
  if (method === 'POST' && url === '/books') {
    let body = '';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
      addBook(req, res, JSON.parse(body));
    });
    return;
  }

  // GET /books
  if (method === 'GET' && url === '/books') {
    return getAllBooks(req, res);
  }

  // GET /books/:id
  if (method === 'GET' && parts[0] === 'books' && parts.length === 2) {
    return getBookById(req, res, parts[1]);
  }

  // PUT /books/:id
  if (method === 'PUT' && parts[0] === 'books' && parts.length === 2) {
    let body = '';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
      updateBookById(req, res, parts[1], JSON.parse(body));
    });
    return;
  }

  // DELETE /books/:id
  if (method === 'DELETE' && parts[0] === 'books' && parts.length === 2) {
    return deleteBookById(req, res, parts[1]);
  }

  // 404
  res.writeHead(404);
  res.end('Not Found');
}

export default route;
