const router = require('express').Router();

const DepResponsible = require('../models/ItemsKpi/DepResponsibleModel');

const responsibility = new DepResponsible();
router.get('/responsibility',(req, res) => res.sendAsyncApi(responsibility.findAll()));
router.get('/responsibility/:id',(req, res) => res.sendAsyncApi(responsibility.findOne(req.params.id)));
router.post('/responsibility',(req, res) => res.sendAsyncApi(responsibility.save(req.body)));
router.put('/responsibility/:id',(req, res) => res.sendAsyncApi(responsibility.update(req.params.id,req.body)));
router.delete('/responsibility/:id',(req, res) => res.sendAsyncApi(responsibility.delete(req.params.id)));


module.exports = router;