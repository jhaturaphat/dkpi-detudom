const router = require('express').Router();

const KpiTplModel = require('../models/kpitemplate/KpiTplModel');
const KpiScoreModel = require('../models/kpitemplate/KpiScoreModel');
const KpiRangeYearModel = require('../models/kpitemplate/KpiRangeYearModel');
const KpiChartModel = require('../models/kpitemplate/KpiChartModel');
const KpiRangeItemModel = require('../models/kpitemplate/KpiRangItemModel');

const model = new KpiTplModel();
const score = new KpiScoreModel();
const year = new KpiRangeYearModel();
const range = new KpiRangeItemModel();
const chart = new KpiChartModel();
router.get('/',(req, res)=>{
    res.json({message:'Hello KPI'});
})
router.get('/template',(req, res)=> res.sendAsyncApi(model.findAll()));
router.get('/template/:id',(req, res)=> res.sendAsyncApi(model.findOne(req.params.id)));
router.post('/template',(req, res)=> res.sendAsyncApi(model.save(req.body)));
router.put('/template/:id',(req, res)=> res.sendAsyncApi(model.update(req.params.id, req.body)));
router.delete('/template/:id',(req, res)=> res.sendAsyncApi(model.delete(req.params.id, req.body)));
// คะแนน
router.get('/score/:year',(req, res)=> res.sendAsyncApi(score.findAll(req.params.year)));
router.get('/score/:id/:year',(req, res)=> res.sendAsyncApi(score.findOne(req.params.id, req.params.year)));
router.post('/score', (req, res)=> res.sendAsyncApi(score.save(req.body)));

// items
router.get('/year', (req, res)=> res.sendAsyncApi(year.findAll()));

// Chart
router.get('/chart/:id/:year', (req, res)=> res.sendAsyncApi(chart.find(req.params.id, req.params.year)))

// 
router.get('/range/:frequency_id',(req, res)=> res.sendAsyncApi(range.findAll(req.params.frequency_id)));


module.exports = router;