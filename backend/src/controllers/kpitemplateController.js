const router = require('express').Router();

const KpiTplModel = require('../models/kpitemplate/KpiTplModel');

const model = new KpiTplModel();

router.get('/find',(req, res)=> res.sendAsyncApi(model.findAll()));
router.get('/find:id',(req, res)=> res.sendAsyncApi(model.findOne(req.params.id)));
router.post('/save',(req, res)=> res.sendAsyncApi(model.save(req.body)));

module.exports = router;