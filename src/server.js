require("dotenv").config()
const express = require('express')
const connectDB = require('./config/dB')
const alunosRoutes = require('./Routes/alunosRoutes')
const treinadorRoutes = require('./Routes/treinadorRoutes')
const authRouters = require('./Routes/authRouter')


const app = express()
app.use(express.json())

const dados = require("dotenv").config
connectDB()


app.use('/alunos', alunosRoutes)
app.use('/treinador', treinadorRoutes)
app.use('/auth', authRouters)

const port = process.env.PORT || 5000
app.listen(port, ()=>{console.log(`Servidor rodando na porta: ${port}`)})