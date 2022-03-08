require('dotenv').config();
const mysql = require('mysql'); // เรียกใช้งาน MySQL module

class HisDatabase {

    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HIS_HOST,
            user: process.env.DB_HIS_USER,
            password: process.env.DB_HIS_PASS,
            database: process.env.DB_HIS_DATABASES,
            charset: process.env.DB_HIS_CHARSET,
            port:process.env.DB_HIS_PORT
        });
        // แก้ภาษาต่างดาว
        this.connection.on('connection', function (connection) {
            connection.query('SET NAMES "utf8"');            
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

module.exports = {HisDatabase}