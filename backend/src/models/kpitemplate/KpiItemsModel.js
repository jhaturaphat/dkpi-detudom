const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiItemsModel {
  constructor(valid = validate, db = database.KpiDatabase) {
    this._database = new db();
    this._validate = valid;
    this.validate_rules = { };
  }

  async findAll() {
      const sql = `SELECT 
      indi.*,
      kpi_tpl.*,
      dep_care.name_th as depname_th,
      freq.name_th as freqname_th
      FROM kpi_tpl
      INNER JOIN dep_care ON kpi_tpl.dep_care_id = dep_care.id
      INNER JOIN frequency as freq ON kpi_tpl.frequency_id = freq.id
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
      ) AS indi ON kpi_tpl.indi_name_id = indi.idn_id`;

   return await this._database.query(sql);
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

module.exports = KpiItemsModel;
