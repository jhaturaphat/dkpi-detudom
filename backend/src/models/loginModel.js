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
        console.log(data[0].name);     
        if(!data.length) return       
         const token = jwt.sign({ foo: data[0].password+"63" }, process.env.SECRET_KEY, {expiresIn:"2h"}); 

         const user = new Object()
         user.token = token
         user.username = data[0].loginname
         user.fullname = data[0].name
         return user;
    }
}

module.exports = LoginModel