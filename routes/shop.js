const path = require("path");

const express = require("express");

const productsController = require('../controller/products');

// const rootDir = require("../utils/path");
// const adminData = require("./admin");

const router = express.Router();

router.get("/", productsController.getProducts);

module.exports = router;
