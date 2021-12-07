const router = require('express').Router();

const GroupController = require('../controllers/indicators/GroupController');
const NameController = require('../controllers/indicators/NameController');
const TypeController = require('../controllers/indicators/TypeController');

const Group = new GroupController();
router.get('/group',(req, res) => res.sendAsyncApi(Group.findAll()));
router.post('/group',(req, res) => res.sendAsyncApi(Group.save(req.body)));

const Type = new TypeController();
router.get('/type', (req, res) => res.sendAsyncApi(Type.findAll()));

const Name = new NameController();
router.get('/name', (req, res) => res.sendAsyncApi(Name.findAll()));

module.exports = router;