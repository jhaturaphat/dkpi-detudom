const router = require('express').Router();

const KpiTplModel = require('../models/kpitemplate/KpiTplModel');
const KpiScoreModel = require('../models/kpitemplate/KpiScoreModel');
const KpiRangeYearModel = require('../models/kpitemplate/KpiRangeYearModel');
const KpiChartModel = require('../models/kpitemplate/KpiChartModel');
const KpiRangeItemModel = require('../models/kpitemplate/KpiRangItemModel');
const KpiUnitModel = require('../models/kpitemplate/KpiUnitModel');

const authorize = require("../middleware/authorization-middleware")
const admin = ["create","read","update","delete"]


const model = new KpiTplModel();
const score = new KpiScoreModel();
const year = new KpiRangeYearModel();
const range = new KpiRangeItemModel();
const chart = new KpiChartModel();
const unit = new KpiUnitModel();


router.get('/',(req, res)=>{
    res.json({message:'Hello KPI'});
})
router.get('/template',(req, res)=> res.sendAsyncApi(model.findAll()));
router.get('/template/:id',(req, res)=> res.sendAsyncApi(model.findOne(req.params.id)));
router.post('/template',authorize(admin),(req, res)=> res.sendAsyncApi(model.save(req.body)));
router.put('/template/:id',authorize(admin),(req, res)=> res.sendAsyncApi(model.update(req.params.id, req.body)));
router.delete('/template/:id',authorize(admin),(req, res)=> res.sendAsyncApi(model.delete(req.params.id, req.body)));
router.get('/totaltpl',(req,res)=> res.sendAsyncApi(model.totaltpl()))
// คะแนน
router.get('/score/:year',(req, res)=> res.sendAsyncApi(score.findAll(req.params.year)));
router.get('/score/:id/:year',(req, res)=> res.sendAsyncApi(score.findOne(req.params.id, req.params.year)));
router.post('/score',authorize(admin), (req, res)=> res.sendAsyncApi(score.save(req.body)));
router.put('/score/:id',authorize(admin), (req, res)=> res.sendAsyncApi(score.update(req.params.id, req.body)));

// items
router.get('/year', (req, res)=> res.sendAsyncApi(year.findAll()));

// Chart
router.get('/chart/:id/:year', (req, res)=> res.sendAsyncApi(chart.find(req.params.id, req.params.year)))

// 
router.get('/range/:frequency_id',(req, res)=> res.sendAsyncApi(range.findAll(req.params.frequency_id)));

//หน่วยนับ
router.get('/unit',(req, res)=> res.sendAsyncApi(unit.findAll()));




module.exports = router;