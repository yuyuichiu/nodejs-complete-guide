const http = require('http')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const rootDir = require('./utility/path')

const app = express();  // this is a function, which have many method for us to use
const port = process.env.PORT || 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Activate Template Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Apply body parser to all post data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes here, default should be '/'
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// A general fallback serve as the 404 error page
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir , 'views', '404.html'))
  res.render('404', { pageTitle: 'Error' })
})

app.listen(port);