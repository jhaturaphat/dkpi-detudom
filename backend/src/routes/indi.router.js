// router ของการจัดการกับตาราง indi_group ซึ่งอ้างอิงไปที่ indiController.js

const router = require('express').Router()

const {findAll, findOne, save, update, _delete} = require('../controllers/indiGroupController');


router.get('/findall',findAll)
router.get('/findone/:id',findOne)
router.post('/save',save)
router.put('/update/:id',update)
router.delete('/delete/:id',_delete)

module.exports = router;