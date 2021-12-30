const validate = require("validate.js");
const databases = require("../../configs/KpiDatabaes");

class DepCareModel {
  constructor(valid = validate, db = databases.KpiDatabase) {
    this._databases = new db();
    this._validate = valid;
    this.validate_rules = {      
      name_th: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      name_en: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
    };
  }

  async findAll() {
    return await this._databases.query("SELECT * FROM dep_care");
  }

  async findOne(id) {
    const item = await this._databases.query(
      "SELECT * FROM dep_care WHERE id=?",
      [id]
    );
    return item.length == 0 ? null : item[0];
  }

  async save(value) {
    const errors = this._validate(value, this.validate_rules);
    if (errors) throw { errors };
    const result = await this._databases.query(
      "INSERT INTO dep_care (name_th, name_en) VALUES (?,?)",
      [value["name_th"], value["name_en"]]
    );
    return await this.findOne(result.insertId);
  }

  async update(id, value) {
    const errors = this._validate(value, this.validate_rules);
    const errorsId = this._validate(
      { id },
      {
        id: {
          presence: {
            allowEmpty: true,
          },
        },
      }
    );    
    if (errors || errorsId) throw { errors: errorsId || errors };
      console.log(id);
    const result = await this._databases.query(
      "UPDATE dep_care SET name_th=?, name_en=? WHERE id=?",
      [value["name_th"], value["name_th"], id]
    );
    console.log(result);
    return await this.findOne(id);
  }

  async delete(id) {    
    const errors = this._validate(
      { id },
      { id: { presence: { allowEmpty: false } } }
    );    
    if (errors) throw { errors };
    return await this._databases.query("DELETE FROM dep_care WHERE id=?", [id]);
  }
}

module.exports = DepCareModel;
