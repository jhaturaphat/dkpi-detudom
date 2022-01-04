const databases = require("../../configs/KpiDatabaes");

class FreqStoreModel {
    constructor(db = databases.KpiDatabase) {
        this._databases = new db();
    }
    async findAll() {
        return await this._databases.query("SELECT * FROM freq_store");
      }
}


module.exports = FreqStoreModel;