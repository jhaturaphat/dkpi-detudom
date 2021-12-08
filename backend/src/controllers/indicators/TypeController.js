const validate = require('validate.js');
const database = require('../../configs/KpiDatabaes');

class GroupController {
    constructor(
        valid = validate,
        db = database.KpiDatabase
        ){
        this._databases = new db();
        this._validate = valid;
        this.validate_rules = {
            id: {
                presence: {
                    allowEmpty: false
                },
                format: {
                    pattern: "[A-Z]{1}",
                    flags: "i",
                    message: "1 ตัวพิมพ์ใหญ่ A-Z เท่านั้น"
                  }
            },
            name_th: {
                presence: {
                    allowEmpty: false,
                    message:"ไม่สามารถเว้นว่างได้"
                },                
            },
            name_en: {
                presence: {
                    allowEmpty: true
                }
            }
        };
    }

    findAll(){
        return this._databases.query('SELECT * FROM indi_type');
    }

    async findOne(id){
        const item = await this._databases.query('SELECT * FROM indi_type WHERE id=?',[id]);
        return item.length == 0 ? null : item[0];
    }


    async save(value){
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._databases.query('INSERT INTO indi_type (id,name_th, name_en) VALUES (?,?,?)',[
            value['id'].toUpperCase(),
            value['name_th'],
            value['name_en']
        ]);        
        return await this.findOne(value['id']);
    }

    async update(id, value) {  
        const errors = this._validate(value, this.validate_rules);        
        const errorsId = this._validate({id} , { id: { format:{pattern:'[A-Z]{1}', message: "1 ตัวพิมพ์ใหญ่ A-Z เท่านั้น"} }});
        console.log(value);
        if (errors || errorsId) throw { errors: errorsId || errors };
        
        await this._databases.query("UPDATE indi_type SET name_th=?, name_en=? WHERE id=?",[
            value['name_th'],
            value['name_en'],
            id
        ])
        return await this.findOne(id);
    }

    async delete(id){
        const errors = this._validate({ id }, { id: { presence: {allowEmpty: false} } }); 
        console.log(errors);       
        if (errors) throw { errors };
        return await this._database.query('DELETE FROM indi_type where id=?', [id]);
    }
}

module.exports = GroupController;