const fs = require('fs');
const path = require('path');
const Product = require('./product')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(product) {
    // Fetch previous cart
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(data)
      }

      // analyze cart content (check if target product already exist in cart)
      const existingProductIdx = cart.products.findIndex(x => x.id === product.id);
      const existingProduct = cart.products[existingProductIdx];
      let updatedProduct;

      // Edit quantity if already exist
      if(existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.quantity += 1;
        cart.products[existingProductIdx] = updatedProduct;
      }
      // Add new product into cart if not already exist
      else {
        updatedProduct = { id: product.id, price: product.price, title: product.title, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      // update cart total price
      cart.totalPrice = Math.round((cart.totalPrice + +product.price) * 100) / 100;

      // write the new cart data into cart file
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if(err) { return }
        console.log('Updated cart:', cart);
      })
    }) 
  }

  // Return current cart data
  static getCart() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, (err, data) => {
        let cart = { products: [], totalPrice: 0 }
        if (!err) {
          cart = JSON.parse(data);
        }
        resolve(cart);
      })
    })
  }
}