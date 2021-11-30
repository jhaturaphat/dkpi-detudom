const express = require('express')
const router = express.Router()

const db = require('../config/db')

const indi = require('../models/indicator.model')

router.route('/indicator?')
   .get((req, res, next) => {
      db.query('SELECT * FROM hdd', function (error, results, fields) {
         if (error) throw error;    
         console.log('data from query: ', results); 
         res.json(results)              
       });
   })
   .post((req, res, next)=> {
      res.json(req.body)
   })

module.exports = router;