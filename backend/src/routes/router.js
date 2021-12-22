const router = require('express').Router();

router.use('/indi', require('../controllers/IndicatorsController'));

module.exports = router;