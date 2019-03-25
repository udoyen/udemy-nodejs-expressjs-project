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
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFileSync(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
