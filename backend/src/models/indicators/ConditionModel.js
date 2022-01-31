const validate = require('validate.js');
const database = require('../../configs/KpiDatabaes');

class ConditionModel {
    constructor(
        valid = validate,
        db = database.KpiDatabase
        ){
        this._databases = new db();
        this._validate = valid;
        this.validate_rules = {};
    }

    async findAll(){
        return await this._databases.query('SELECT * FROM kpi_condition');
    }

    async findOne(id){
        const item = await this._databases.query('SELECT * FROM kpi_condition WHERE id=?',[id]);
        return item.length == 0 ? null : item[0];
    }
}

module.exports = ConditionModel; 