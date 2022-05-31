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
        INNER JOIN dkpi_label AS kpi ON score.kpi_tpl_id = kpi.id
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