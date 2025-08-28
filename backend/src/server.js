require("dotenv").config()
const express = require('express')
const connectDB = require('./config/dB')
const alunosRoutes = require('./Routes/alunosRoutes')
const treinadorRoutes = require('./Routes/treinadorRoutes')
const authRouters = require('./Routes/authRouter')
const pagamentoRoutes = require('./Routes/pagamentoRoutes')
const cors = require('cors')
const path = require('path')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Conexão com Mongo
connectDB()
require('./Service/cronJobs')
require('./Service/gerarPagamentos')

// Rotas API
app.use('/alunos', alunosRoutes)
app.use('/pagamentos', pagamentoRoutes)
app.use('/treinador', treinadorRoutes)
app.use('/auth', authRouters)

// ✅ Servir frontend React em produção
if (process.env.NODE_ENV === "production") {
  const __dirnameGlobal = path.resolve();

  // Servir os arquivos estáticos da pasta build
  app.use(express.static(path.join(__dirnameGlobal, "../frontend/dist")));

  app.get("*", (req, res) => {
    if (
      req.path.startsWith("/alunos") ||
      req.path.startsWith("/treinador") ||
      req.path.startsWith("/pagamentos")
    ) {
      return res.status(404).json({ error: "Endpoint não encontrado" });
    }
    res.sendFile(path.join(__dirnameGlobal, "../frontend/dist", "index.html"));
  });
}


const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`🚀 Servidor rodando na porta: ${port}`) })
