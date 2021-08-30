const express = require('express')
const path = require('path')

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
  res.render('add-product', { pageTitle: 'Add Product' });
})

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
})

module.exports = router;
module.exports.products = products;