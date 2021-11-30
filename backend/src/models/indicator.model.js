
const db = require('../config/db')

async function group (){
  let data = null
    await db.query('SELECT * FROM hdd', function (error, results, fields) {
        if (error) throw error;
        return results;
        //console.log('data from query: ', results); 
               
      });
} 

module.exports = group
