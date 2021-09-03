const express = require('express')
const path = require('path')

const productModal = require('../modals/product')

const router = express.Router();

router.get('/', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
  res.render('shop', {
    pageTitle: 'Welcome',
    products: productModal.Product.fetchAll()
  });
})

module.exports = router;