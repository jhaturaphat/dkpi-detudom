const router = require('express').Router();

router.use('/authen', require('../controllers/loginController'));
router.use('/indi',  require('../controllers/IndicatorsController'));
router.use('/itemkpi', require('../controllers/ItemsKpiController'));
router.use('/kpi', require('../controllers/kpitemplateController'));

module.exports = router;