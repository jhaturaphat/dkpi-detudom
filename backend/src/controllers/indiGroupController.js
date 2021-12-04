const db = require('../configs/db')


count = async () => {
   try{
      return await db.execute('SELECT COUNT(*) FROM indi_group');         
   }catch(err){
      throw(err);
   }   
}

// ดึงข้อมูลทุก recoard
exports.findAll = async (req, res) =>{
   try{
      // const result = arr.reduce((obj, cur) => ({...obj, [cur.sid]: cur}), {})
      const count = await db.execute('SELECT COUNT(*) AS count FROM indi_group');      
      const result = await db.execute('SELECT * FROM indi_group');   
      res.json({
         error:false,
         message:"ยินดีตอนรับ",
         data:result.length == 0 ? null : result[0],
         count: count[0][0]
      });
   }catch(err){
      res.status(500);
      res.json({
         error:true, 
         message:err.message,
         data:err
      });
   }   
}

// ดึงข้อมูล 1 recoard
exports.findOne = async (req, res) =>{
   console.log(req.params.id);
   try{
      const result = await db.execute('SELECT * FROM indi_group WHERE id=?',[req.params.id]);   
      res.json({
         error:false,
         message:"ยินดีตอนรับ",
         data:result.length == 0 ? null : result[0][0]
      });
   }catch(err){
      res.status(500);
      res.json({
         error:true, 
         message:err.message,
         data:err
      });
   }
   
}

// บันทึกข้อมูลลงตาราง indi_g
exports.save = async (req,res)=>{  
   let {id, name_th, name_en} = req.body;
   try{
      const result = await db.execute('INSERT INTO indi_group (id,name_th, name_en) VALUES (?,?,?)',[id,name_th,name_en]);   
      res.json({
         error:false,
         message:"บันทึกข้อมูลสำเร็จ",
         data:result.length == 0 ? result.length[0] : null
      });
   }catch(err){
      res.status(500);
      res.json({
         error:true, 
         message:err.message,
         data:err
      });
   }  
}

// แก้ไขข้อมูล
exports.update = async (req,res) => {

}

// ลบข้อมูล
exports._delete = async (req,res) => {

}