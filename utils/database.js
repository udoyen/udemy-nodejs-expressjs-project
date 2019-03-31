// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: '172.17.0.2',
//     user: 'root',
//     database: 'nodecomplete',
//     password: 'admin'
// })

const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodecomplete', 'root', 'admin', {
    dialect: 'mysql',
    host: '172.17.0.2'
})

module.exports = sequelize;