const http = require('http')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();  // this is a function, which have many method for us to use
const port = process.env.PORT || 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors')

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
app.use(errorController.error404);

app.listen(port);