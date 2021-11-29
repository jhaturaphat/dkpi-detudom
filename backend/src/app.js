require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(urlencoded({extended: true}));

app.get('/',(req, res)=>{
    res.json({
        'message':'Hello World'
    })
});

//const {PORT} = process.env;
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>console.log(`Sergver start on PORT ${PORT}`));