const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./utils/database").mongoConnect;
const User = require("./models/user");

const app = express();

// Set global configuration value
app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controller/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const cartRoutes = require("./routes/cart");

// Register a parser
app.use(bodyParser.urlencoded({ extended: false }));
// Grant access to the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5ca48f50f1021d6ee52ce412")
    .then(user => {
      req.user = user;
      console.log(req.user._id);
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
// app.use(cartRoutes);

// Catch all middleware
app.use(errorController.getErrorPage);

mongoConnect(() => {
  app.listen(3000);
});
