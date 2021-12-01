// router ของการจัดการกับตาราง indi_group ซึ่งอ้างอิงไปที่ indiController.js

const express = require('express')
const router = express.Router();

const {AllGroup, createGroup} = require('../controllers/indicatorController');

router.get('/group',AllGroup)
router.post('/group',createGroup)

module.exports = router;