const kpiconnection = require('../configs/KpiDatabaes');

class IndiTypeController {
    constructor(kpidb = kpiconnection.KpiDatabase){
        this._db = new kpidb();
    }

    async selectAll() {
       console.log(this._db.query('SELECT 1+1'));
    }
}

module.exports = IndiTypeController;