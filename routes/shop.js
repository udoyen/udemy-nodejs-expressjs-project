const path = require("path");

const express = require("express");

const shopController = require('../controller/shop');

// const rootDir = require("../utils/path");
// const adminData = require("./admin");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

module.exports = router;
