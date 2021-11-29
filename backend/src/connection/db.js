require('dotenv').config();

const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASES
});

module.exports = db;