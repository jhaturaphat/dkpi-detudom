
const database = require("../../configs/KpiDatabaes");

class KpiUnitModel {
    constructor(db = database.KpiDatabase) {
        this._database = new db();
      }

      async findAll(){
        return await this._database.query('SELECT * FROM score_unit');
      }
}

module.exports = KpiUnitModel;