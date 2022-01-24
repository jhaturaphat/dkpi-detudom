const router = require('express').Router();

const KpiTplModel = require('../models/kpitemplate/KpiTplModel');
const KpiScoreModel = require('../models/kpitemplate/KpiScoreModel');
const KpiRangeYearModel = require('../models/kpitemplate/KpiRangeYearModel');

const model = new KpiTplModel();
const score = new KpiScoreModel();
const year = new KpiRangeYearModel();

router.get('/template',(req, res)=> res.sendAsyncApi(model.findAll()));
router.get('/template/:id',(req, res)=> res.sendAsyncApi(model.findOne(req.params.id)));
router.post('/template',(req, res)=> res.sendAsyncApi(model.save(req.body)));
router.put('/template/:id',(req, res)=> res.sendAsyncApi(model.update(req.params.id, req.body)));
router.delete('/template/:id',(req, res)=> res.sendAsyncApi(model.delete(req.params.id, req.body)));
// คะแนน
router.get('/score/:year',(req, res)=> res.sendAsyncApi(score.findAll(req.params.year)));
router.get('/score/:id/:year',(req, res)=> res.sendAsyncApi(score.findOne(req.params.id, req.params.year)));

// items
router.get('/year', (req, res)=> res.sendAsyncApi(year.findAll()));


module.exports = router;