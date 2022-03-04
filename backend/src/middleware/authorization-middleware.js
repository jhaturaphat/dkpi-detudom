const jwt = require("jsonwebtoken")
const config = require("../configs/jwt_secret")

module.exports = (credentials = [])=>{
    return (req, res, next) => {
        if(typeof credentials === "string"){
            credentials = [credentials]
        }

        //มองหา JWT in Header
        const token = req.header['authorization'];
        if(!token) return res.status(401).send("ไม่มีสิทธิ์เข้าถึง: access denied");
        // ตรวจสอบ JWT Bearer 
        const tokenBody = token.slice(7);
        jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded)=>{
            if(err) return res.status(401).send("Error: Access Denied");
            // ไม่มีข้อผิดพลาด JWT ดี!
            // ตรวจสอบข้อมูลประจำตัวที่ถูกส่งผ่านใน
            if(credentials.length > 0){
                if(decoded.scope && jwt.decoded.scope.length && credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)){
                    next();
                }else{
                    return res.status(401).send("Error: Access Denied");
                }
            }else{
                // ไม่จำเป็นต้องมีข้อมูลประจำตัวผู้ใช้ได้รับอนุญาต
                next();
            }

        });
    }
}

// https://github.com/brian-childress/node-authorization-middleware/blob/master/authorization-middleware.js