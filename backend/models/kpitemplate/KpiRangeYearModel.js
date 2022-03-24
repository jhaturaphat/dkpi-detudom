const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiRangeYear {
    constructor(valid = validate, db = database.KpiDatabase) {
        this._database = new db();
        this._validate = valid;
        this.validate_rules = { 
            label: {
                year_id: {
                    allowEmpty: false,
                    message: "ไม่สามารถเว้นว่างได้",
                },
            },
        };
      }

    async findAll() {
        return await this._database.query("SELECT * FROM kpi_range_year ORDER BY year_id DESC");
    }

    
}


module.exports = KpiRangeYear;