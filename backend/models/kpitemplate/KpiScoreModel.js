const validate = require("validate.js");
const database = require("../../configs/KpiDatabaes");

class KpiScoreModel {
  constructor(valid = validate, db = database.KpiDatabase) {
    this._database = new db();
    this._validate = valid;
    this.validate_rules = { };
  }

  // ดึงข้อมูลด้วย ปี พ.ศ.
  async findAll(value) {
    var year = new Date(`${value}-10-01 00:00:00`);    
    const sql = `
    SELECT * 
		FROM(
		SELECT 
		indi.*,
		kpi_tpl.*,
		dep_care.name_th as depname_th,
		freq.name_th as freqname_th
		FROM kpi_tpl
		LEFT JOIN dep_care ON kpi_tpl.dep_care_id = dep_care.id
		LEFT JOIN frequency as freq ON kpi_tpl.frequency_id = freq.id
		LEFT JOIN (
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
		LEFT JOIN ( 
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
				kri.prefix as kri_prefix,
				kri.day,
        su.*
				FROM kpi_score AS ks
				INNER JOIN kpi_range_year AS kry ON ks.kpi_range_year_year_id = kry.year_id				
				INNER JOIN kpi_range_item AS kri ON ks.kpi_range_item_id = kri.id
        INNER JOIN score_unit AS su ON ks.score_unit_id = su.unit_id
				WHERE ks.kpi_range_year_year_id = YEAR(?)
		) AS score ON kpi_tpl.id = score.kpi_tpl_id
			GROUP BY kpi_tpl.id
		) as kpi
LEFT JOIN (
		SELECT  kpi_score.kpi_tpl_id, COUNT(kpi_range_year_year_id) as total_keep  FROM kpi_score WHERE kpi_range_year_year_id = YEAR(?)  GROUP BY kpi_tpl_id
) AS total ON kpi.id = total.kpi_tpl_id
    `;

   const result = await this._database.query(sql,[year, year]);
    let new_result = result.map(e=>{
      return {...e, year:parseInt(value, 10), year_th:parseInt(value, 10) + 543}
    })

    return new_result;
  }

  async findWith(year_id, depcare_id){
    var year = new Date(`${year_id}-10-01 00:00:00`);    
    const sql = `
    SELECT * 
		FROM(
		SELECT 
		indi.*,
		kpi_tpl.*,
		dep_care.name_th as depname_th,
		freq.name_th as freqname_th
		FROM kpi_tpl
		LEFT JOIN dep_care ON kpi_tpl.dep_care_id = dep_care.id
		LEFT JOIN frequency as freq ON kpi_tpl.frequency_id = freq.id
		LEFT JOIN (
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
		LEFT JOIN ( 
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
				kri.prefix as kri_prefix,
				kri.day,
        su.*
				FROM kpi_score AS ks
				INNER JOIN kpi_range_year AS kry ON ks.kpi_range_year_year_id = kry.year_id				
				INNER JOIN kpi_range_item AS kri ON ks.kpi_range_item_id = kri.id
        INNER JOIN score_unit AS su ON ks.score_unit_id = su.unit_id
				WHERE ks.kpi_range_year_year_id = YEAR(?)
		) AS score ON kpi_tpl.id = score.kpi_tpl_id
      WHERE kpi_tpl.dep_care_id IN(?)
			GROUP BY kpi_tpl.id
		) as kpi
LEFT JOIN (
		SELECT  kpi_score.kpi_tpl_id, COUNT(kpi_range_year_year_id) as total_keep  FROM kpi_score WHERE kpi_range_year_year_id = YEAR(?)  GROUP BY kpi_tpl_id
) AS total ON kpi.id = total.kpi_tpl_id
    `;

    //console.log(depcare_id);
   const result = await this._database.query(sql,[year, depcare_id, year]);
    let new_result = result.map(e=>{
      return {...e, year:parseInt(year_id, 10), year_th:parseInt(year_id, 10) + 543}
    })

    return new_result;
  }

  

  async findId(id){
    return await this._database.query('SELECT * FROM kpi_score WHERE id = ?', id);
  }

  async save(value) {     
    const result = await this._database.query(`INSERT INTO kpi_score (target_score, score, kpi_tpl_id, kpi_range_item_id, kpi_range_year_year_id,score_unit_id) VALUES (?,?,?,?,?,?)`,
    [
      value['target_score'],      
      value['score'],
      value['kpi_tpl_id'],
      value['kpi_range_item_id'],
      value['kpi_range_year_year_id'],
      value['score_unit_id'],
    ]
    );
    return await this.findId(result.insertId);
  }

  // 
  async update(id, value) {
    const result = await this._database.query(`UPDATE kpi_score SET target_score=?,  score=?, kpi_tpl_id=?, kpi_range_item_id=?, kpi_range_year_year_id=?, score_unit_id=? WHERE id=?`,
    [
      value['target_score'],      
      value['score'],
      value['kpi_tpl_id'],
      value['kpi_range_item_id'],
      value['kpi_range_year_year_id'],
      value['score_unit_id'],
      id
    ]
    );
    return await this.findId(result.insertId);
  }

  // 
  async delete(id) {
    return await this._database.query();
  }

  // 
  async findKpi(value){
        
  }
}

module.exports = KpiScoreModel;