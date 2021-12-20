const router = require('express').Router();

router.use('/indi', require('../controllers/IndicatorsController'));

/*
const GroupController = require('../controllers/indicators/GroupController');
const NameController = require('../controllers/indicators/NameController');
const TypeController = require('../controllers/indicators/TypeController');

const Group = new GroupController();
router.get('/group',(req, res) => res.sendAsyncApi(Group.findAll()));
router.get('/group/:id',(req, res) => res.sendAsyncApi(Group.findOne(req.params.id)));
router.post('/group',(req, res) => res.sendAsyncApi(Group.save(req.body)));
router.put('/group/:id',(req, res) => res.sendAsyncApi(Group.update(req.params.id,req.body)));
router.delete('/group/:id',(req, res) => res.sendAsyncApi(Group.delete(req.params.id)));

const Type = new TypeController();
router.get('/type', (req, res) => res.sendAsyncApi(Type.findAll()));
router.get('/type/:id',(req, res) => res.sendAsyncApi(Group.findOne(req.params.id)));
router.post('/type',(req, res) => res.sendAsyncApi(Group.save(req.body)));
router.put('/type/:id',(req, res) => res.sendAsyncApi(Group.update(req.params.id,req.body)));
router.delete('/type/:id',(req, res) => res.sendAsyncApi(Group.delete(req.params.id)));

const Name = new NameController();
router.get('/name', (req, res) => res.sendAsyncApi(Name.findAll()));*/

module.exports = router;