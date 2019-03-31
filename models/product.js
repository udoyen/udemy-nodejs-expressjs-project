const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;

// creates an object
/**
module.exports = function Product() {

}
*/
// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/path");
// const Cart = require("./cart");
// const uuidv4 = require("uuid/v4");
// const db = require("../utils/database");

// create a path to the storage
// file
// const p = path.join(rootDir, "data", "products.json");

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContents) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContents));
//     }
//   });
// };

// module.exports = class Product {
//   // Define the shape of the object - Product
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static deleteById(id) {}

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ? LIMIT 1', [id]);
//   }
// };
