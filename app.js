const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);
