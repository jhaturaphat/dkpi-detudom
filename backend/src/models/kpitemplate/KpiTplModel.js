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
          allowEmpty: true,
          message: "ไม่สามารถเว้นว่างได้",
        },
      },
      diag_b: {
        presence: {
          allowEmpty: true,
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
      active_date:{
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
      dep_care_id:{
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

  async findAll() {
   return await this._database.query('SELECT * FROM kpi_tpl');
  }

  async findOne(id) {
    return await this._database.query('SELECT * FROM kpi_tpl WHERE id= ?',[id]);
  }

  async save(value) {   
    // ตรวจสอบ Form
    const errors = this._validate(value, this.validate_rules);
    if(errors) throw {errors};
    // บันทึกข้อมูล
    const result = await this._database.query(
      "INSERT INTO kpi_tpl (label, objective, formular, txt_a, txt_b,diag_a, diag_b,measure, benchmark, howtooper, ref, active_date, edit_date, edit_note, note, dep_care_id, indi_name_id, freq_store_id, status) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        value['label'],
        value['objective'],
        value['formular'],
        value['txt_a'],
        value['txt_b'],
        value['diag_a'],
        value['diag_b'],
        value['measure'],
        value['benchmark'],
        value['howtooper'],
        value['ref'],
        value['active_date'],
        value['edit_date'],
        value['edit_note'],
        value['note'],
        value['dep_care_id'],
        value['indi_name_id'],
        value['freq_store_id'],
        value['status']
      ]
    );
    return this.findOne(result.insertId);

  }

  async update(id, value) {}

  async delete(id) {}
}

module.exports = KpiTplModel;
