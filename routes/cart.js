const path = require("path");

const express = require("express");

const shopController = require('../controller/shop');

const router = express.Router();

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/create-order', shopController.postOrder);

module.exports = router;