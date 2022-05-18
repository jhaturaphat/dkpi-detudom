const router = require('express').Router();

const LoginModel = require('../models/loginModel');

const authorize = require("../middleware/authorization-middleware")

const admin = ["create","read","update","delete"]
const model = new LoginModel();

router.get('/',authorize(admin),(req, res)=> {
    res.json({message:"Hello Authen"})
});

router.post('/login',(req, res)=> res.sendAsyncApi(model.login(req.body)));

module.exports = router;