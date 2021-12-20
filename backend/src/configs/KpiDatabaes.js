require('dotenv').config();
const mysql = require('mysql'); // เรียกใช้งาน MySQL module

class KpiDatabase {

    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASES,
            charset: process.env.DB_CHARSET,
            port:process.env.DB_PORT
        });
    }

    // Custom ฟังชั่นก์ Query ข้อมูลใหม่
    query(sql, params = null) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (errors, result) => {
                if (errors) return reject({ errors });                
                resolve(result);
            });
        });
    }
} 

module.exports = {KpiDatabase}