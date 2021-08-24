/* Building the raw logic of node.js servers */
const http = require('http');
const fs = require('fs');

// createServer returns a server
const server = http.createServer((req, res) => {
  // This function is a requestListener, which keeps node.js running
  if(req.url === '/'){
    res.write('<html');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<form action="/message" method="POST"><input name="test" type="text"/><button type="submit">Send</button></form>');
    res.write('</html>');
    return res.end();
  }

  if (req.url === '/message' && req.method === 'POST'){
    const body = [];
    // LIsten to data buffering and completion
    req.on('data', (chunk) => {
      // Reading chunks due to buffering may separate data in pieces.
      console.log('Chunk:',chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      // Combine the buffers and translate it into a string that we understands
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const msg = parsedBody.split("=")[1];
      fs.writeFileSync('message.txt', msg);
    })

    // 302 is the redirection status code.
    res.statusCode = 302;
    res.setHeader('location', "/");
    return res.end();
  }

  res.write('<html>');
  res.write('<head><title>First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js server</h1></body>');
  res.write('</html>');
  res.end();
});

// Node.js keeps the server running to LISTEN to requests
server.listen(3000);