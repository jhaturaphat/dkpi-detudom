const router = require('express').Router();

const LoginModel = require('../models/loginModel');

const model = new LoginModel();

router.get('/',(req, res)=> {
    res.json({message:"Helloe Authen"})
});

router.post('/login',(req, res)=> res.sendAsyncApi(model.login(req.body)));

module.exports = router;