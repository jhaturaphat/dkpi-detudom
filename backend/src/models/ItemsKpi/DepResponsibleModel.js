const validate = require("validate.js");
const databases = require("../../configs/KpiDatabaes");

class DepResponsibleModel {
  constructor(valid = validate, db = databases.KpiDatabase) {
    this._databases = new db();
    this._validate = valid;
    this.validate_rules = {      
      fname: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      lname: {
        presence: {
          allowEmpty: true,
        },
      },
    };
  }

  async findAll() {
    return await this._databases.query("SELECT * FROM dep_responsible");
  }

  async findOne(id) {
    const item = await this._databases.query(
      "SELECT * FROM dep_responsible WHERE id=?",
      [id]
    );
    return item.length == 0 ? null : item[0];
  }

  async save(value) {
    const errors = this._validate(value, this.validate_rules);
    if (errors) throw { errors };
    const result = await this._databases.query(
      "INSERT INTO dep_responsible (fname, lname, job) VALUES (?,?,?)",
      [value["fname"], value["lname"],value["job"]]
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
    console.log(value);
    if (errors || errorsId) throw { errors: errorsId || errors };

    await this._databases.query(
      "UPDATE dep_responsible SET fname=?, lname=?, job=? WHERE id=?",
      [value["fname"], value["lname"], value["job"], id]
    );
    return await this.findOne(id);
  }

  async delete(id) {
    const errors = this._validate(
      { id },
      { id: { presence: { allowEmpty: false } } }
    );
    console.log(errors);
    if (errors) throw { errors };
    return await this._database.query("DELETE FROM dep_responsible where id=?", [id]);
  }
}

module.exports = DepResponsibleModel;
