const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require('express-handlebars');
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

// Setup Handlebars
// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/',
//      defaultLayout: 'main-layout',
//      extname: 'hbs'
//     }));

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
  User.findByPk(1)
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

// Used to add middleware
// next is a function
// app.use((req, res, next) => {
//     console.log('In the middleware here');
//     next(); // Allows the request to continue to the next middlwware in line

// })

// app.use('/', (req, res, next) => {
//     console.log('In first middleware');
//     next();

// })

// Catch all middleware
app.use(errorController.getErrorPage);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({force: true})
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "George", email: "g@gmail.com" });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
