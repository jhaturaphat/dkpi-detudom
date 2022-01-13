const router = require('express').Router();

const KpiTplModel = require('../models/kpitemplate/KpiTplModel');

const model = new KpiTplModel();

router.get('/template',(req, res)=> res.sendAsyncApi(model.findAll()));
router.get('/template:id',(req, res)=> res.sendAsyncApi(model.findOne(req.params.id)));
router.post('/template',(req, res)=> res.sendAsyncApi(model.save(req.body)));
router.put('/template/:id',(req, res)=> res.sendAsyncApi(model.update(req.params.id, req.body)));

module.exports = router;