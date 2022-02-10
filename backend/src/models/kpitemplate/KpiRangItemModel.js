const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiRangeItem{
    constructor(valid = validate, db = database.KpiDatabase) {
        this._database = new db();
        this._validate = valid;
        this.validate_rules = { };
    }

    async findAll(value){
        return await this._database.query("SELECT * FROM kpi_range_item WHERE frequency_id = ? ORDER BY loop_id ASC",[value]);
    }
}

module.exports = KpiRangeItem;