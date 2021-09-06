// On a MVC structure, we put our route functions here
const { Product } = require('../models/product')

exports.getAddProductPage = (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product' });
}

exports.postNewProduct = (req, res, next) => {
  // Add a new product through the class method defined in Modal
  const newProduct = new Product({
    title: req.body.title
  });
  newProduct.save();

  res.redirect('/');
}