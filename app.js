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

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Register a parser
app.use(bodyParser.urlencoded({extended: false}));
// Grant access to the public folder 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.router);

app.use(shopRoutes);

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
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: " " // stops the 404 page from complaining
    });
})

app.listen(3000);
