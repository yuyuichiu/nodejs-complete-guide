const bodyParser = require('body-parser');
const express = require('express');
const path = require('path')

const app = express();
const PORT = 3000;

// Config & Middleware
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const testRoute = require('./router/test.js')
app.use('/test', testRoute)

app.get('/', (req, res) => {
  fruits = ['apple', 'grapes', 'orange']
  return res.render('index', {
    name: 'John Doe',
    fruits: fruits
  })
})

let login = false;

app.get('/login', (req, res) => {
  return res.render('login')
})

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if(username == 'user' && password == 'user123') {
    login = true;
    return res.redirect('/user')
  }

  return res.redirect('/login')
})

app.get('/user', (req, res) => {
  if(!login) { return res.redirect('/login') }

  return res.render('user', {
    user: req.params.user
  })
})

app.listen(PORT)