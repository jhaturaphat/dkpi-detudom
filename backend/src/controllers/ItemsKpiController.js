const router = require('express').Router();

const DepResponsible = require('../models/ItemsKpi/DepCareModel');
const FreqStoreModel = require('../models/ItemsKpi/FreqStoreModel');

const depcare = new DepResponsible();
router.get('/depcare',(req, res) => res.sendAsyncApi(depcare.findAll()));
router.get('/depcare/:id',(req, res) => res.sendAsyncApi(depcare.findOne(req.params.id)));
router.post('/depcare',(req, res) => res.sendAsyncApi(depcare.save(req.body)));
router.put('/depcare/:id',(req, res) => res.sendAsyncApi(depcare.update(req.params.id,req.body)));
router.delete('/depcare/:id',(req, res) => res.sendAsyncApi(depcare.delete(req.params.id)));

const freqStore = new FreqStoreModel();
router.get('/freqstore', (req, res) => res.sendAsyncApi(freqStore.findAll()));

module.exports = router;