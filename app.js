const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require("./models/user");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI =
  'mongodb+srv://george:udemy_321@udemycluster-bb3gw.mongodb.net/shop';
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'

});
// Set global configuration value
app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");

// Register a parser
app.use(bodyParser.urlencoded({ extended: false }));
// Grant access to the public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(cartRoutes);
app.use(authRoutes);

// Catch all middleware
app.use(errorController.getErrorPage);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

