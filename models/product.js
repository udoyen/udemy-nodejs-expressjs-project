// creates an object
/**
module.exports = function Product() {

}
*/
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
// create a path to the storage
// file
const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContents) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContents));
    }
  });
};

module.exports = class Product {
  // Define the shape of the object - Product
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }
};


