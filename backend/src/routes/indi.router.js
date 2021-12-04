// router ของการจัดการกับตาราง indi_group ซึ่งอ้างอิงไปที่ indiController.js

const router = require('express').Router()

const {AllGroup, createGroup} = require('../controllers/indiGroupController');

const indiTypeController = require('../controllers/indiTypeController');
indiType = new indiTypeController();

router.get('/group',AllGroup)
router.post('/group',createGroup)

router.get('/type', (req, res) => res.sendAsyncApi(indiType.selectAll()))

module.exports = router;