require('dotenv').config()
const express=require('express');
const cors=require('cors');
const configration = require('./config/db');
const app=express()
app.use(express.json())
app.use(cors())

const port=process.env.PORT||3111


configration()



app.listen(port,()=>{
console.log('server running in port',port)
})