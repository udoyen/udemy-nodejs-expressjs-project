const path = require('path');

// Returns the path to the module app.js
// that is running the app
module.exports = path.dirname(process.mainModule.filename);