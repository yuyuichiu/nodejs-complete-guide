// Model controls the logic related to database, reading + modification of data.

// We will try to save things in a file instead of inside a DB for now
const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

let products = []

module.exports = class Product {
  constructor(title) {
    this.title = title
  }

  // Save a new product into products
  save() {
    // Read current JSON array
    const filepath = path.join(rootDir, 'data', 'products.json')
    fs.readFile(filepath, (err, data) => {
      if (!err) {
        products = JSON.parse(data);
      }

      products.push(this)
      fs.writeFile(filepath, JSON.stringify(products), (err) => {
        if (err) { throw 'Cannot write into file' }
      })
    })
  }

  // Get all products
  static fetchAll () {
    // Because return does not work inside readfile() due to different scope, we cannot directly return products
    // Therefore we need a promise to send the products as a resolve method.
    return new Promise((resolve, reject) => {
      try{
        const filepath = path.join(rootDir, 'data', 'products.json')
        fs.readFile(filepath, (err, data) => {
          if (!err) {
            products = JSON.parse(data);
          }
          resolve(products)
        })
      } catch(error) {
        reject(error)
      }
    })
  }
}