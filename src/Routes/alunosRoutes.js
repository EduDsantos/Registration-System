const express = require("express")
const router = express.Router()
const{criarAluno, listarAlunos, /*buscarAlunoPorId*/ buscarAlunoPorNome, atualizarAluno,excluirAluno} = require("../Controllers/alunoController")

router.post("/", criarAluno)

router.get("/", listarAlunos)

//router.get("/:id", buscarAlunoPorId)
router.get("/:nome",buscarAlunoPorNome)

router.put("/:nome", atualizarAluno)

router.delete("/:nome", excluirAluno)

module.exports= router