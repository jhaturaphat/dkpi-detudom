require('dotenv').config();
const jwt = require("jsonwebtoken");
const database = require("../configs/HisDatabase");
const md5 = require('md5');
class LoginModel {
    constructor(db = database.HisDatabase){
        this._database = new db();
    }

    async login(value){        
        const data = await this._database.query(`SELECT * FROM opduser WHERE loginname = ? AND passweb = ?`,
            [
                value['username'], 
                md5(value['password'])
            ]        
        );   
       
        const payload = {
            name: data[0].loginname,
            scopes: "customer:read"
          };
          
        if(!data.length) return {message:"Username or Password is invalid."}    

         const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"2h"}); 

         const user = new Object()
         user.token = token
         user.username = data[0].loginname
         user.fullname = data[0].name
         return user; 
    }
}

module.exports = LoginModel