const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiScoreModel {
  constructor(valid = validate, db = database.KpiDatabase) {
    this._database = new db();
    this._validate = valid;
    this.validate_rules = { };
  }

  async findAll() {
   return await this._database.query();
  }

  async findOne(id) {
    return await this._database.query();
  }

  async save(value) { 
  }

  async update(id, value) {
  }

  async delete(id) {
    return await this._database.query();
  }
}

module.exports = KpiScoreModel;
