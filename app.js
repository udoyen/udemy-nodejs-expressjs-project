const http = require('http');

const express = require('express');

const app = express();

// Used to add middleware
// next is a function
app.use((req, res, next) => {
    console.log('In the middleware here');
    next(); // Allows the request to continue to the next middlwware in line

})

app.use((req, res, next) => {
    console.log('In another middleware here');
    res.send('<h1>Hello from express</h1>');

})

app.listen(3000);
