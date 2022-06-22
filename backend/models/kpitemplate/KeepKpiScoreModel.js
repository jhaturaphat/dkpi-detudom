const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KeepKpiScoreModel {
  constructor(valid = validate, db = database.KpiDatabase) {
    this._database = new db();
    this._validate = valid;
    this.validate_rules = { };
  }

  // ดึงข้อมูลด้วย ปี และ รหัส
  async findOne(id, yyyy) {   
    var year = new Date(`${yyyy}-10-01 00:00:00`);       
    const sql = `
    SELECT 
        ks.id,        
        ks.target_score,
        ks.score_unit,
        ks.score,
        ks.kpi_tpl_id,
        ks.score_unit_id,
        kry.year_label,
        kry.year_id,
        kry.date_begin,
        kry.date_end,
        kry.status,
        kri.loop_id,
        kri.id as kri_id,
        kri.name_th as kri_name_th,
        kri.prefix,
        kri.day,
        su.*        
        FROM kpi_score AS ks
        INNER JOIN kpi_range_year AS kry ON ks.kpi_range_year_year_id = kry.year_id        
        INNER JOIN kpi_range_item AS kri ON ks.kpi_range_item_id = kri.id
        INNER JOIN score_unit AS su ON ks.score_unit_id = su.unit_id
        WHERE ks.kpi_range_year_year_id = YEAR(?) AND ks.kpi_tpl_id = ?
        ORDER BY kri.loop_id ASC
    `;
    return await this._database.query(sql,[year, id]);
    
  }
}

module.exports = KeepKpiScoreModel;