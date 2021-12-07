const database = require('../../configs/KpiDatabaes')

class TypeController {
    constructor(db = database.KpiDatabase){
        this._databases = new db();
    }

    findAll(){
        return this._databases.query('SELECT * FROM indi_group');
    }
}

module.exports = TypeController;