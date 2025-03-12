require("dotenv").config()
const express = require('express')
const connectDB = require('./config/dB')
const routeAlunos = require('./Routes/alunosRoutes')


const app = express()
app.use(express.json())
const port = process.env.port || 5000
app.use("/alunos", routeAlunos)

connectDB()


app.get('/', function(req,res){
    res.send('Servidor Rodando')
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`)
})