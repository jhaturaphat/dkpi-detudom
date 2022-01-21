const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiScoreModel {
  constructor(valid = validate, db = database.KpiDatabase) {
    this._database = new db();
    this._validate = valid;
    this.validate_rules = { };
  }

  async findAll(year) {

    const sql = `
    SELECT 
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
    ) AS indi ON kpi_tpl.indi_name_id = indi.idn_id
    INNER JOIN ( 
      SELECT 
        ks.id,
        ks.loop_id,
        ks.target_score,
        ks.score_unit,
        ks.score,
        ks.kpi_tpl_id,
        kry.year_label,
        kry.year_id,
        kry.date_begin,
        kry.date_end,
        kry.status,
        kri.name_th as kri_name_th,
        kri.prefix,
        kri.day,
        kcd.symbol,
        kcd.name_th as sym_name
        FROM kpi_score AS ks
        INNER JOIN kpi_range_year AS kry ON ks.kpi_range_year_year_id = kry.year_id
        INNER JOIN kpi_condition AS kcd ON ks.kpi_condition_id = kcd.id
        INNER JOIN kpi_range_item AS kri ON ks.kpi_range_item_id = kri.id
        WHERE ks.kpi_range_year_year_id = YEAR(?)
    ) AS score ON kpi_tpl.id = score.kpi_tpl_id
		GROUP BY kpi_tpl.id;
    `;
   return await this._database.query(sql,[year]);
  }

  async findOne(id, year) {    
    const sql = `
    SELECT 
        ks.id,
        ks.loop_id,
        ks.target_score,
        ks.score_unit,
        ks.score,
        ks.kpi_tpl_id,
        kry.year_label,
        kry.year_id,
        kry.date_begin,
        kry.date_end,
        kry.status,
        kri.name_th as kri_name_th,
        kri.prefix,
        kri.day,
        kcd.symbol,
        kcd.name_th as sym_name
        FROM kpi_score AS ks
        INNER JOIN kpi_range_year AS kry ON ks.kpi_range_year_year_id = kry.year_id
        INNER JOIN kpi_condition AS kcd ON ks.kpi_condition_id = kcd.id
        INNER JOIN kpi_range_item AS kri ON ks.kpi_range_item_id = kri.id
        WHERE ks.kpi_range_year_year_id = YEAR('2022-01-21 09:33:03') /*AND ks.kpi_tpl_id = 1*/
    `;
    const result =  await this._database.query(sql,[year, id]);
    const chart = [];
    const label = result.map(e => e.prefix);
    const data =  result.map(e => e.score);
    chart.push(chart['label'] = label, chart['data'] = data);
    return chart;   
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
