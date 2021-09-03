// The Modal in MVC Structure. Manages the data of the application.
// We can establish classes here, and export the class to Controller.
const fs = require('fs');
const path = require('path');

/* New Task: Save your products in a file instead of an array */
const allProducts = [];

exports.Product = class Product {
  // constructor collects parameter of newly created items
  // ,and let us assign them into local class variables
  constructor(p) {
    this.product = p;
  }

  save() {
    const filePath = path.join(__dirname, 'product.txt');

    fs.readFile(filePath, (err, data) => {
      let products = [];

      if (!err) {
        // The product array is stored as JSON, which needs to be transformed
        products = JSON.parse(data);
        products.push(this.product);
        console.log(products);
        
        // Now write the new product into the file
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          if (err) { console.log(err) }

          
        })
      }
    })
  }

  // static keyword allows us to call this method directly on the class
  // which saves us from creating a dummy data just to call this method. Cool.
  static fetchAll() {

  }
}