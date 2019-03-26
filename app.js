const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

// Setup Handlebars
// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/',
//      defaultLayout: 'main-layout',
//      extname: 'hbs'
//     }));


// Set global configuration value
app.set('view engine',  'ejs');
app.set('views', 'views');

const errorController = require('./controller/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');

// Register a parser
app.use(bodyParser.urlencoded({extended: false}));
// Grant access to the public folder 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
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

app.listen(3000);