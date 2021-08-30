const express = require('express')
const path = require('path')

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
  res.render('shop', { pageTitle: 'Welcome', products: adminData.products});
})

module.exports = router;