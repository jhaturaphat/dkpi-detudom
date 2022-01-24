const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiChartModel {
    constructor(valid = validate, db = database.KpiDatabase) {
      this._database = new db();
      this._validate = valid;
      this.validate_rules = { };
    }

    async findOne(id, year) {  
      console.log(id, year);  
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
          WHERE ks.kpi_range_year_year_id = YEAR(?) AND ks.kpi_tpl_id = ?
      `;
      const result =  await this._database.query(sql,[year, id]);
      let chartJs = {
        year:'',
        label:'',
        data:''
      };    
      const label = result.map((e,i,arr) =>e.prefix);  
      const data = result.map((e,i,arr) =>e.score);  
      
      chartJs.year = result[0].year_id + 543;
      chartJs.label = label;
      chartJs.data = data;
      
      return chartJs;
    }
    
  }


    module.exports = KpiChartModel;