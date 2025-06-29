import http from 'http';
import route from './routes.js';

const PORT = 9000;

const server = http.createServer((req, res) => {
  route(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
