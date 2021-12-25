const validate = require('validate.js');
const database = require('../../configs/KpiDatabaes');

class NameModel{
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
                    pattern: "[0-9]{4}",
                    flags: "i",
                    message: "4 ตัวเลข 0-9 เท่านั้น"
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
            },
            indi_type_id:{
                presence: {
                    allowEmpty: false,
                    message:"ไม่สามารถเว้นว่างได้"
                },
            }
        };
    }

    async findAll(){
        return await this._databases.query(`SELECT n.*, t.indi_group_id AS gid , t.name_th AS tname_th, t.name_en AS tname_en, g.name_th AS gname_th, g.name_en AS gname_en
        FROM indi_name AS n
        INNER JOIN indi_type AS t ON n.indi_type_id = t.id
        INNER JOIN indi_group AS g ON t.indi_group_id = g.id`);
    }

    async findOne(id){
        const item = await this._databases.query('SELECT * FROM indi_name WHERE id=?',[id]);
        return item.length == 0 ? null : item[0];
    }


    async save(value){
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._databases.query('INSERT INTO indi_name (id,name_th, name_en, indi_type_id) VALUES (?,?,?,?)',[
            value['id'],
            value['name_th'],
            value['name_en'],
            value['indi_type_id'].toUpperCase()
        ]);        
        return await this.findOne(value['id']);
    }

    async update(id, value) {  
        const errors = this._validate(value, this.validate_rules);        
        const errorsId = this._validate({id} , { id: { format:{pattern:'[0-9]{4}', message: "4 ตัวเลข 0-9 เท่านั้น"} }});
        console.log(value);
        if (errors || errorsId) throw { errors: errorsId || errors };
        
        await this._databases.query("UPDATE indi_name SET name_th=?, name_en=?, indi_type_id=? WHERE id=?",[
            value['name_th'],
            value['name_en'],
            value['indi_type_id'].toUpperCase(),
            id
        ])
        return await this.findOne(id);
    }

    async delete(id){
        const errors = this._validate({ id }, { id: { presence: {allowEmpty: false} } }); 
        console.log(errors);       
        if (errors) throw { errors };
        return await this._databases.query('DELETE FROM indi_name where id=?', [id]);
    }
}

module.exports = NameModel;