const path = require("path");

const express = require("express");

const shopController = require('../controller/shop');

const router = express.Router();

router.get("/cart", shopController.getCart);
router.post('/cart', shopController.postCart);

module.exports = router;