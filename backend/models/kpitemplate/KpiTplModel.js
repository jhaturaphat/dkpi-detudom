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
      kpi_condition_id:{
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
      frequency_id:{
        presence: {
            allowEmpty: false,
            message: "ไม่สามารถเว้นว่างได้",
        },
      }
    };
  }

  async findAll() {
    const sql = `
    SELECT 
        kpi_tpl.*,
        indi.*,
        fq.name_th as fq_name_th
      FROM kpi_tpl
      INNER JOIN frequency AS fq ON kpi_tpl.frequency_id = fq.id
      INNER JOIN (
          SELECT 
          idn.id as idn_id,
          idn.name_th as idn_name_th,
          idn.name_en as idn_name_en,
          idt.name_th as idt_name_th,
          idg.id as idg_id,
          idg.name_th as idg_name_th
          FROM indi_name AS idn
          INNER JOIN indi_type AS idt ON idn.indi_type_id = idt.id
          INNER JOIN indi_group AS  idg ON idt.indi_group_id = idg.id
      ) AS indi ON kpi_tpl.indi_name_id = indi.idn_id
    `;
   return await this._database.query(sql);
  }

  async findOne(id) {
    const sql = `
    SELECT 
      kpi_tpl.*,
      indi.*,
      fq.name_th as fq_name_th
    FROM kpi_tpl
    INNER JOIN frequency AS fq ON kpi_tpl.frequency_id = fq.id
    INNER JOIN (
        SELECT 
        idn.id as idn_id,
        idn.name_th as idn_name_th,
        idn.name_en as idn_name_en,
        idt.name_th as idt_name_th,
        idg.id as idg_id,
        idg.name_th as idg_name_th
        FROM indi_name AS idn
        INNER JOIN indi_type AS idt ON idn.indi_type_id = idt.id
        INNER JOIN indi_group AS  idg ON idt.indi_group_id = idg.id
    ) AS indi ON kpi_tpl.indi_name_id = indi.idn_id
    WHERE kpi_tpl.id = ?
    `;
    return await this._database.query(sql,[id]);
  }

  async save(value) {   
    // ตรวจสอบ Form
    const errors = this._validate(value, this.validate_rules);
    if(errors) throw {errors};
    // บันทึกข้อมูล
    const sql = `
    INSERT INTO kpi_tpl (label, objective, formular, txt_a, txt_b,diag_a, diag_b,measure, benchmark, kpi_condition_id, ref, active_date, edit_date, edit_note, note, dep_care_id, indi_name_id, frequency_id, status) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    const result = await this._database.query(sql ,
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
        value['kpi_condition_id'],
        value['ref'],
        value['active_date'],
        value['edit_date'],
        value['edit_note'],
        value['note'],
        value['dep_care_id'],
        value['indi_name_id'],
        value['frequency_id'],
        value['status']
      ]
    );
    return this.findOne(result.insertId);

  }

  async update(id, value) {
    // ตรวจสอบ Form
    const errors = this._validate(value, this.validate_rules);
    if(errors) throw {errors};
    // บันทึกข้อมูล
    const result = await this._database.query(
      `UPDATE kpi_tpl SET label=?, objective=?, formular=?, txt_a=?, txt_b=?,diag_a=?, diag_b=?,measure=?, benchmark=?, kpi_condition_id=?, ref=?, active_date=?, edit_date=?, edit_note=?, note=?, dep_care_id=?, indi_name_id=?, frequency_id=?, status=? WHERE id=?`,
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
        value['kpi_condition_id'],
        value['ref'],
        value['active_date'],
        value['edit_date'],
        value['edit_note'],
        value['note'],
        value['dep_care_id'],
        value['indi_name_id'],
        value['frequency_id'],
        value['status'],
        id
      ]
    );
    return this.findOne(result.insertId);
  }

  async delete(id) {
    return await this._database.query("DELETE FROM kpi_tpl WHERE id=?",[id]);
  }

  async totaltpl(){
    const result =  await this._database.query("SELECT frequency_id FROM kpi_tpl");
    
    const month = {
      label: 'จำนวนตัวชี้วัดรายเดือน',
      value: result.filter(e=>e.frequency_id==='M').length
    }    
    const quarter = {
      label: 'จำนวนตัวชี้วัดรายไตรมาส',
      value: result.filter(e=>e.frequency_id==='Q').length
    }   
    const year = {
      label: 'จำนวนตัวชี้วัดรายปี',
      value: result.filter(e=>e.frequency_id==='Y').length
    }    
    const all = {
      label:'จำนวนตัวชี้วัดทั้งหมด',
      value: result.length  
    } 
    const totalkpi = []; totalkpi.push(month,quarter,year, all);
    return totalkpi;
  }
}

module.exports = KpiTplModel;
