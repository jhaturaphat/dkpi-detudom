
const db = require('../config/db')

const item = "";

async function _group (){  
    await db.query('SELECT * FROM hdd', function (error, results, fields) {
        if (error) throw error;
        item = results;
        //console.log('data from query: ', results); 
               
      });
} 

module.exports = {
  item,
  _group
} 
