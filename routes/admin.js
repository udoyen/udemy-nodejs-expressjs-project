const path = require('path');

const express = require('express');

const productsController = require('../controller/products');

// const rootDir = require('../utils/path');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', productsController.getAddProducts);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProducts);

module.exports = router;

// Or
// exports.routes = router;
// exports.products = products;
