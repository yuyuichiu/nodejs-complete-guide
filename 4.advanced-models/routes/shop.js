const express = require('express')
// const path = require('path');

const productModal = require('../models/product')

const router = express.Router();

router.get('/', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))

  productModal.Product.fetchAll((p) => {
    res.render('shop', {
      pageTitle: 'The Shop Page',
      products: p   /* The callback parameter consist of the data we need, because we put it there. */
    });
  })
})

module.exports = router;