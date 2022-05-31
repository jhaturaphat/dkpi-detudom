const router = require('express').Router();

const ChartModel = require('../models/chart/ChartModel');

const chart = new ChartModel();

router.post('/top-chart/:year',(req, res) => res.sendAsyncApi(chart.TopChart(req.params.year, req.body)));
router.get('/top-chart-list',(req, res) => res.sendAsyncApi(chart.FindTopChartList()));

module.exports = router;