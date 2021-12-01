const express = require('express')
const router = express.Router();

const {create} = require('../controllers/indicatorController');

router.get('/indicator',create)

module.exports = router;