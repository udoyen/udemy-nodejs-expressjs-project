const Product = require("../models/product");
const reloadify = require('../utils/reloadify.js');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products"
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => { 
    console.log(product);
  })
  res.redirect('/');
};



exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: 'Your Cart',
    path: "/cart"
  })

};

exports.getIndex = (req, res, nexr) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      sc: reloadify.watchScript
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
};
