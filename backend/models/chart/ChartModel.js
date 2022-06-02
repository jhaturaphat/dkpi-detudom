const database = require("../../configs/KpiDatabaes");

class ChartModel {
    constructor(db = database.KpiDatabase) {
        this._database = new db();
    }

    async TopChart(value, body){
        const id = body.map(e=>e.kpi_tpl_id);       
        const sql =  `
        SELECT
        kpi.*, 
        score.kpi_tpl_id,
        score.score,
        score.target_score,
        score.kpi_range_year_year_id,
        kri.name_th,
        kri.prefix,
        kri.loop_id			
        FROM kpi_score AS score
        LEFT JOIN kpi_range_item AS kri ON score.kpi_range_item_id = kri.id
        INNER JOIN (
            SELECT 
                kpi_tpl.id,
                indi_group.name_th as igroup,
                indi_type.name_th as itype,
                indi_name.name_th as iname
                FROM kpi_tpl
                INNER JOIN indi_name ON kpi_tpl.indi_name_id = indi_name.id
                INNER JOIN indi_type ON indi_name.indi_type_id = indi_type.id
                INNER JOIN indi_group ON indi_type.indi_group_id = indi_group.id	
            ) AS kpi ON score.kpi_tpl_id = kpi.id
        WHERE score.kpi_tpl_id IN(?)
        AND score.kpi_range_year_year_id = ?
        ORDER BY kri.loop_id
        `;
       return await this._database.query(sql,[id, value]);
    }
    async FindTopChartList(){
        return await this._database.query("SELECT * FROM top_chart");
     }
}

module.exports = ChartModel;