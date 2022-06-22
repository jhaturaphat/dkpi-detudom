const router = require('express').Router();

const KeepKpiScore = require('../models/kpitemplate/KeepKpiScoreModel');


const authorize = require("../middleware/authorization-middleware")
const admin = ["create","read","update","delete"]

const keepscore = new KeepKpiScore();

router.get('/score/:id/:year',(req, res)=> res.sendAsyncApi(keepscore.findOne(req.params.id, req.params.year)));
router.post('/score',authorize(admin), (req, res)=> res.sendAsyncApi(keepscore.save(req.body)));
router.put('/score/:id',authorize(admin), (req, res)=> res.sendAsyncApi(keepscore.update(req.params.id, req.body)));

module.exports = router;