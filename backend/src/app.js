require('dotenv').config();

const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const indicator = require('./controllers/indicator.controller')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(urlencoded({extended: true}));

app.use('/api', indicator) 
app.get('/',(req, res)=>{
    res.json({
        'message':'Hello World'
    })
});

//const {PORT} = process.env;
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>console.log(`Sergver start on PORT ${PORT}`));