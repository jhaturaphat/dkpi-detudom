require('dotenv').config();

const mysql = require('mysql2'); // เรียกใช้งาน MySQL module

// กำหนดการเชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASES
  }).promise();




// ทำการเชื่อมต่อกับฐานข้อมูล 
// db.connect((err) =>{
//     if(err){ // กรณีเกิด error
//         console.error('error connecting: ' + err.message)
//         return
//     }
//     console.log('connected as id ' + db.threadId)
// })
 
module.exports = db; 