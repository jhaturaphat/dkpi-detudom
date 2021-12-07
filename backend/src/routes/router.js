const router = require('express').Router();



const TypeController = require('../controllers/indicators/TypeController');
const Type = new TypeController();

router.get('/type', (req, res) => res.sendAsyncApi(Type.findAll()));


module.exports = router;