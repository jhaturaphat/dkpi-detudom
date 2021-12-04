require('dotenv').config();
const mysql = require('mysql2'); // เรียกใช้งาน MySQL module

class KpiDatabase {

    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASES
        }).promise();
    }

    // Custom ฟังชั่นก์ Query ข้อมูลใหม่
    query(sql, params = null) {        
        this.connection.query(sql, params, (errors, result) => {
            if (errors) return { errors };
            return result;
        });        
    }
}

module.exports = {KpiDatabase}