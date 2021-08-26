/* Building the raw logic of node.js servers */
const http = require('http');

const routes = require('./routes');

// createServer returns a server
const server = http.createServer(routes);

// Node.js keeps the server running to LISTEN to requests
server.listen(3000);