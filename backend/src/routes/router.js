const router = require('express').Router();

router.use('/indi', require('../controllers/IndicatorsController'));
router.use('/itemkpi', require('../controllers/ItemsKpiController'));

module.exports = router;