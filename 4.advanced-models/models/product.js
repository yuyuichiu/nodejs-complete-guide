// The Modal in MVC Structure. Manages the data of the application.
// We can establish classes here, and export the class to Controller.
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'product.json');

exports.Product = class Product {
  // constructor collects parameter of newly created items
  // ,and let us assign them into local class variables
  constructor(p) {
    this.product = p;
  }

  save() {
    fs.readFile(filePath, 'utf8', (err, data) => {
      // Read the array in the text file, but we need to parse it first
      let products = data ? JSON.parse(data) : [];

      // Now we push our new product and write the new file
      products.push(this.product);

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) { console.log('Something went wrong in writing the new product array into product.txt') }
      })
    })
  }

  // static keyword allows us to call this method directly on the class
  // which saves us from creating a dummy data just to call this method. Cool.
  static fetchAll(callback) {
    let result = [];

    fs.readFile(filePath, 'utf8', (err, data) => {
      // Use callback when you need to return something derived from a async process.
      // In this case, we need to return the readFile data to use it elsewhere.
      if (err) { callback([]) }
      callback(JSON.parse(data));
    })
  }
}