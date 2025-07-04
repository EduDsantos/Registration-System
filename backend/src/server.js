require("dotenv").config()
const express = require('express')
const connectDB = require('./config/dB')
const alunosRoutes = require('./Routes/alunosRoutes')
const treinadorRoutes = require('./Routes/treinadorRoutes')
const authRouters = require('./Routes/authRouter')
const pagamentoRoutes = require('./Routes/pagamentoRoutes')

const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())


connectDB()
require('./Service/cronJobs')
require('./Service/gerarPagamentos')


app.use('/alunos', alunosRoutes)
app.use('/treinador', treinadorRoutes)
app.use('/treinador', authRouters)
app.use('/cadastrar', alunosRoutes)
app.use('/editar', alunosRoutes)
app.use('/deletar', alunosRoutes)
app.use('/pagamentos', pagamentoRoutes)
app.use('/ativos', alunosRoutes)
app.use('/pagamentos/pendentes', pagamentoRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Servidor rodando na porta: ${port}`) })