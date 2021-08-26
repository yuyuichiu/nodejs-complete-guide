const fs = require('fs');

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<body><h1>Welcome to user server</h1>');
    res.write('After inserting the users, please go to path "/users" to see the result.')
    res.write('<form action="/create-user" method="post"><input name="user"/><button type="submit">Create User</button></form>')
    res.write('</body></html>');

    res.statusCode = 200;
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => { body.push(chunk); })

    req.on('end', () => {
      const data = Buffer.concat(body).toString();
      const parsedUsername = data.split('=')[1];

      fs.appendFile('users.txt', `${parsedUsername}\n`, (error) => {
        console.log('Added user:', parsedUsername);
        res.writeHead(302, { 'Location': '/' });
        return res.end();
      })
    });
  }

  if (url === '/users' && method === 'GET') {
    fs.readFile('users.txt', 'utf8', (err, data) => {
      const rawUserData = data.trim().split('\n');
        
      res.write('<html>');
      res.write('<body><h1>Users</h1>');
      res.write('<ul>')

      rawUserData.forEach((user) => {
        res.write(`<li>${user}</li>`);
      })

      res.write('</ul>');

      res.write('</body></html>');

      res.statusCode = 200;

      return res.end();
    })
  }
}

module.exports = requestHandler;

// '/' some greeting text 
// with a form of username input 
// send post on button click 

// 'create-user' route to parse the incoming data & log to console

// '/users' return a list of dummy users <ul><li>....