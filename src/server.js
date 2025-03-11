require("dotenv").config()
const express = require('express')
const connectDB = require('./config/dB')

const app = express()
const port = process.env.port || 5000

connectDB()

app.use(express.json())

app.get('/', function(req,res){
    res.send('Servidor Rodando')
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`)
})