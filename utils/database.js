const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '172.17.0.2',
    user: 'root',
    database: 'nodecomplete',
    password: 'admin'
})

module.exports = pool.promise();