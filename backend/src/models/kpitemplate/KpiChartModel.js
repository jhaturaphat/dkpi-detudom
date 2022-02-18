const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiChartModel {
    constructor(valid = validate, db = database.KpiDatabase) {
      this._database = new db();
      this._validate = valid;
      this.validate_rules = { };
    }

    async find(id, year) {  
      // console.log(id, year);  
      const sql = `
      SELECT 
      score.score,
      score.target_score,
      kri.name_th,
      kri.prefix,
      kri.loop_id
      FROM kpi_score AS score
      LEFT JOIN kpi_range_item AS kri ON score.kpi_range_item_id = kri.id
      WHERE score.kpi_tpl_id =  ?
      AND score.kpi_range_year_year_id = ?
      `;
      return await this._database.query(sql,[id, year]);
      // const result =  await this._database.query(sql,[id, year]);
      // const label = result.map(e=>e.name_th);  
      // const data = result.map(e =>e.score);  
      // const chart = result.map(e=>{
      //  return {...e, label, data}
      // })[0]
      // return chart;
      
    }
    
  }


    module.exports = KpiChartModel;