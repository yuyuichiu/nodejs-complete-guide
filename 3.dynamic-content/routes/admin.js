const express = require('express')

const router = express.Router();

const productController = require('../controllers/products')

router.get('/add-product', productController.getAddProductPage)

router.post('/add-product', productController.postNewProduct)

module.exports = router;
// module.exports.products = productController.products;