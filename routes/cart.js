const path = require("path");

const express = require("express");

const productsController = require('../controller/shop');

const router = express.Router();

router.get("/cart", productsController.getCart);

module.exports = router;