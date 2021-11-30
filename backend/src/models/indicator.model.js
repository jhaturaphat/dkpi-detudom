
const db = require('../config/db')

const item = "";

function indi() {
  db.query('SELECT * FROM hdd', function (error, results, fields) {
    if (error) throw error;    
    console.log('data from query: ', results); 
    return item = results;               
  });
}

exports = {
  item,
  indi
}
