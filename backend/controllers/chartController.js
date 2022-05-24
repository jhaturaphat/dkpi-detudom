const router = require('express').Router();

const ChartModel = require('../models/chart/ChartModel');

const chart = new ChartModel();

router.get('/top-chart',(req, res) => res.sendAsyncApi(chart.TopChart(req.body)));
router.get('/top-chart-list',(req, res) => res.sendAsyncApi(chart.FindTopChartList()));

module.exports = router;