const path = require('path');

const express = require('express');

const adminController = require('../controller/admin');

// const rootDir = require('../utils/path');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

module.exports = router;

// Or
// exports.routes = router;
// exports.products = products;
