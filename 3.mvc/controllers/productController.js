// Controller holds the logic that renders how view should look like.
// It asks for data from model, and execute render() to let view generate dynamic contents
const Product = require('../models/product')

// add-products page
module.exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}

module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const newProduct = new Product(title)
  newProduct.save();
  res.redirect('/');
}

// index page
module.exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render('products', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  })
}

// cart
module.exports.getCart = (req, res, next) => {
  return res.redirect('/')
}