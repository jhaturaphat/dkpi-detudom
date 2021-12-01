const db = require('../config/db')

// ดึงข้อมูลทุก recoard
exports.AllGroup = async (req, res) =>{
   try{
      const result = await db.execute('SELECT * FROM indi_group');   
      res.json({
         error:false,
         message:"ยินดีตอนรับ",
         data:result[0]
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

// บันทึกข้อมูลลงฐานข้อมูล
exports.createGroup = async (req,res)=>{  
   let {id, name_th, name_en} = req.body;
   try{
      const result = await db.execute('INSERT INTO indi_group (id,name_th, name_en) VALUES (?,?,?)',[id,name_th,name_en]);   
      res.json({
         error:false,
         message:"บันทึกข้อมูลสำเร็จ",
         data:result[0]
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