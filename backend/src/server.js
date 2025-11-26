require("dotenv").config()
const express = require('express')
const connectDB = require('./config/dB')
// const dashboardRoutes = require('./Routes/dashboard')
const alunosRoutes = require('./Routes/alunosRoutes')
const treinadorRoutes = require('./Routes/treinadorRoutes')
const authRouters = require('./Routes/authRouter')
const aulasRoutes = require('./Routes/aulasRoutes')
const pagamentoRoutes = require('./Routes/pagamentoRoutes')
const cors = require('cors')
const path = require('path')

const app = express()


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.options(`*`, cors())
app.use(express.json())

connectDB()
require('./Service/cronJobs')
require('./Service/gerarPagamentos')

// app.use("/api/dashboard", dashboardRoutes);
app.use('/api/alunos', alunosRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/treinador', treinadorRoutes);
app.use('/api/auth', authRouters);
app.use("/api/aula", aulasRoutes);
app.use("/api/aulas", aulasRoutes);


if (process.env.NODE_ENV === "production") {
  const __dirnameGlobal = path.resolve();


  app.use(express.static(path.join(__dirnameGlobal, "../frontend/dist")));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirnameGlobal, "../frontend/dist", "index.html"));
  });
}

const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`🚀 Servidor rodando na porta: ${port}`) })
