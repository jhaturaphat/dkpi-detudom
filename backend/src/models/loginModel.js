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
        
        if(!data.length) {
            throw new Error("Username or password is invlid")
        }

        const payload = {
            name: data[0].loginname,            
            scopes: ["create","read","update","delete"]
        };

         const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"2h"}); 

         const access_token = new Object()
         access_token.token = token
         access_token.username = data[0].loginname
         access_token.fullname = data[0].name
         return access_token; 
    }
}

module.exports = LoginModel