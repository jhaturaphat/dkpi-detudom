const db = require('../config/db')

exports.create=(req,res)=>{
   res.json({
      message: "Hello messafe from Controller"
   })
}