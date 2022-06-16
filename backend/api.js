require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors())
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(require('./configs/config'));// สร้าง Function ใหม่ให้กับ express
//Route
app.use('/api', require('./routes/router'));

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Sergver start on PORT ${PORT}`));