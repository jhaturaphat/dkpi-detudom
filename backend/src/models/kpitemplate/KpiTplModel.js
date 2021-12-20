const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiTplModel {
  constructor(valid = validate, db = database.KpiDatabase) {
    this._database = new db();
    this._validate = valid;
    this.validate_rules = {
      label: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      objective: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      formular: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      txt_a: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      txt_b: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      diag_a: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      diag_b: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      measure: {
        presence: {
          allowEmpty: false,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      benchmark: {
        presence: {
          allowEmpty: true,
        },
      },
      howtooper:{
        presence: {
            allowEmpty: true,
        },
      },
      ref:{
        presence: {
            allowEmpty: true,
        },
      },
      start_date:{
        presence: {
            allowEmpty: false,
            message: "ไม่สามารถเว้นว่างได้",
        }, 
      },
      edit_date:{
        presence: {
            allowEmpty: false,
            message: "ไม่สามารถเว้นว่างได้",
          },
      },
      edit_note:{
        presence: {
            allowEmpty: true,
        },
      },
      note:{
        presence: {
            allowEmpty: true,
        },
      },
      dep_responsible:{
        presence: {
            allowEmpty: false,
            message: "ไม่สามารถเว้นว่างได้",
        }, 
      },
      indi_name_id:{
        presence: {
            allowEmpty: false,
            message: "ไม่สามารถเว้นว่างได้",
        },
      },
      freq_store_id:{
        presence: {
            allowEmpty: false,
            message: "ไม่สามารถเว้นว่างได้",
        },
      }
    };
  }

  findAll() {}

  async findOne(id) {}

  async save(value) {}

  async update(id, value) {}

  async delete(id) {}
}

module.exports = KpiTplModel;
