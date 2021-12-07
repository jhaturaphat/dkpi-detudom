const validate = require('validate.js');
const database = require('../../configs/KpiDatabaes');

class GroupController {
    constructor(
        valid = validate,
        db = database.KpiDatabase
        ){
        this._databases = new db();
        this.validate_rules = {
            id: {
                presence: {
                    allowEmpty: false
                },
                format: {
                    pattern: "[A-Z]+",
                    flags: "i",
                    message: "ตัวพิมพ์ใหญ่เท่านั้น"
                  }
            },
            name_th: {
                presence: {
                    allowEmpty: false
                },                
            },
            name_en: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    findAll(){
        return this._databases.query('SELECT * FROM indi_group');
    }

    findOne(id){
        const item = this._databases.query('SELECT * FROM indi_group WHERE id=?',[id]);
        return item.length == 0 ? null : item[0];
    }


    async save(value){
        const item = await this._databases.query('INSERT INTO indi_group VALUES (?,?,?)',[
            value['id'],
            value['name_th'],
            value['name_en']
        ]);
        return await this.findAll(item.insertId);
    }
}

module.exports = GroupController;