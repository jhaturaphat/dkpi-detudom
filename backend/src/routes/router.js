const router = require('express').Router();
const authorize = require("../middleware/authorization-middleware")

router.use('/authen', require('../controllers/loginController'));
router.use('/indi',  require('../controllers/IndicatorsController'));
router.use('/itemkpi', authorize("customer:read"), require('../controllers/ItemsKpiController'));
router.use('/kpi', authorize("customer:read"), require('../controllers/KpitemplateController'));

module.exports = router;