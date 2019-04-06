const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require("./models/user");

const app = express();

// Set global configuration value
app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controller/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");

// Register a parser
app.use(bodyParser.urlencoded({ extended: false }));
// Grant access to the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5ca795ae329d5d22945c662a")
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

// Catch all middleware
app.use(errorController.getErrorPage);

mongoose.connect('mongodb+srv://george:udemy_321@udemycluster-bb3gw.mongodb.net/shop?retryWrites=true')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'George Udosen',
          email: 'george@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

