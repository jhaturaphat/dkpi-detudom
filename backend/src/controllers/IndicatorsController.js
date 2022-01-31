const router = require('express').Router();

const GroupModel = require('../models/indicators/GroupModel')
const NameModel = require('../models/indicators/NameModel');
const Typemodel = require('../models/indicators/TypeModel');
const ConditionModel = require('../models/indicators/ConditionModel');

const Group = new GroupModel();
router.get('/group',(req, res) => res.sendAsyncApi(Group.findAll()));
router.get('/group/:id',(req, res) => res.sendAsyncApi(Group.findOne(req.params.id)));
router.post('/group',(req, res) => res.sendAsyncApi(Group.save(req.body)));
router.put('/group/:id',(req, res) => res.sendAsyncApi(Group.update(req.params.id,req.body)));
router.delete('/group/:id',(req, res) => res.sendAsyncApi(Group.delete(req.params.id)));

const Type = new Typemodel();
router.get('/type', (req, res) => res.sendAsyncApi(Type.findAll()));
router.get('/type/:id',(req, res) => res.sendAsyncApi(Type.findOne(req.params.id)));
router.post('/type',(req, res) => res.sendAsyncApi(Type.save(req.body)));
router.put('/type/:id',(req, res) => res.sendAsyncApi(Type.update(req.params.id,req.body)));
router.delete('/type/:id',(req, res) => res.sendAsyncApi(Type.delete(req.params.id)));

const Name = new NameModel();
router.get('/name', (req, res) => res.sendAsyncApi(Name.findAll()));
router.get('/name/:id',(req, res) => res.sendAsyncApi(Name.findOne(req.params.id)));
router.get('/search-name/:term',(req, res)=>res.sendAsyncApi(Name.findItem(req.params.term)));
router.post('/name',(req, res) => res.sendAsyncApi(Name.save(req.body)));
router.put('/name/:id',(req, res) => res.sendAsyncApi(Name.update(req.params.id,req.body)));
router.delete('/name/:id',(req, res) => res.sendAsyncApi(Name.delete(req.params.id)));

const Condition = new ConditionModel();
router.get('/condition', (req, res)=> res.sendAsyncApi(Condition.findAll()));

module.exports = router;