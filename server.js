const { createServer } = require('http');
const next = require('next');
const expressApp = require('./api/index');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 4000;
nextApp.prepare().then(() => {
  const server = expressApp;

  // Handle Next.js routing
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});
