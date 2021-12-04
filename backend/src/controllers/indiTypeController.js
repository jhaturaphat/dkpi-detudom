const db = require('../configs/db')

// ดึงข้อมูลทุก recoard
exports.All = async (req, res) =>{
   try{
      const result = await db.execute('SELECT * FROM indi_group');   
      res.json({
         error:false,
         message:"ยินดีตอนรับ",
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

// บันทึกข้อมูลลงตาราง  
exports.insert = async (req,res)=>{  
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