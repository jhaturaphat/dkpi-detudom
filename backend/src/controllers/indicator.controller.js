const express = require('express')
const router = express.Router()
const _group = require('../models/indicator.model')

router.route('/indicator?')
.get((req,res, next) => {
   _group().then((item)=>{
    console.log(item);
   })
})

module.exports = router; 